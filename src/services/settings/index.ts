import { writable } from 'svelte/store';
import type { ApolloClient } from '@apollo/client';
import { GetSettingsDocument } from '../../requests';

const defaultSettings: Array<[string, boolean]> = [
    ['allowEdit', false],
    ['allowDelete', false],
    ['allowAnonymous', false]
];

export default function getSettings(client: ApolloClient<any>) {
    let writableSettings = {}
    let readableSettings = {};
    for (let setting of defaultSettings) {
        const [name, defaultValue] = setting;
        const { set, update, subscribe } = writable(defaultValue);
        writableSettings[name] = { set, update };
        readableSettings[name] = { subscribe };
    }

    client
        .query({
            query: GetSettingsDocument
        })
        .then(({ data }) => {
            for (let setting of defaultSettings) {
                let [name] = setting;
                if (data.settings?.[name] !== undefined &&
                    data.settings?.[name] !== null)
                    writableSettings[name].set(data.settings[name]);
            }
        })
        .catch(() => { /* Leave default values */ })

    return readableSettings;
}

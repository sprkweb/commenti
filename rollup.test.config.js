import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import multi from "@rollup/plugin-multi-entry";
import svelte from "rollup-plugin-svelte";
import typescript from '@rollup/plugin-typescript';
import sveltePreprocess from 'svelte-preprocess';

export default {
    input: "spec/**/*.spec.*",
    output: {
        sourcemap: true,
        format: "cjs",
        name: "tests",
        file: "build/bundle-tests.js"
    },
    plugins: [
        multi(),
        svelte({
            preprocess: sveltePreprocess({ sourceMap: true }),
            compilerOptions: {
                css: false,
                dev: true
            }
        }),
        resolve({
            only: [/^svelte-/]
        }),
        commonjs(),
        typescript({
            sourceMap: true,
            inlineSources: true
        })
  ],
    onwarn(warning, warn) {
        if (warning.code === "UNRESOLVED_IMPORT") return;
        warn(warning);
    }
};

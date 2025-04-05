import PocketBase from "pocketbase";
import { writable } from 'svelte/store';

export const pb = new PocketBase("http://34.27.94.66");
pb.autoCancellation(false);

export const authData = writable(pb.authStore.record);

pb.authStore.onChange(() => {
    authData.set(pb.authStore.record);
});

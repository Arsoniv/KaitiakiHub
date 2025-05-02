import PocketBase from "pocketbase";
import { writable } from 'svelte/store';

export const pb = new PocketBase("https://khubbackend.duckdns.org"); // need to use subdomain so that https would work
pb.autoCancellation(false);

// svelte "store" containing authdata, if it == null there is no user signed in
export const authData = writable(pb.authStore.record);

pb.authStore.onChange(() => {
    //whenever the authstore changes (such as when a user logs in or out) i update the store to reflect it
    authData.set(pb.authStore.record);
});

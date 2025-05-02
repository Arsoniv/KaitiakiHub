<script lang="ts">
    import type { PageProps } from './$types';
    import {pb} from "$lib/pocketbase";

    let { data }: PageProps = $props();
    let body = '';

    let commentSuccess = $state(false); //use state to let svelte automatically rerender the user interface when the value changes (reactive state)

    const submitComment = async () => {
        if (body && pb.authStore.record) { // only let the user comment if they are logged in and there is a valid body text
            try {
                await pb.collection('comments').create({
                    body,
                    poster: pb.authStore.record.id,
                    post: (await data.post).id
                });

                body = '';
                commentSuccess = true; // activeates the comment sucsess popup

                setTimeout(() => commentSuccess = false, 3000);// sets 3 second timeout to remove the comment sucsess popup

            } catch (error) {
                console.error('Error creating post:', error);
                alert('Error creating post: '+ error);
            }
        } else {
            console.error('Body is required and you must be logged in.');
            alert('Body is required and you must be logged in.');
        }
    };

</script>

{#await data.post}
    <p class="text-center opacity-50">Fetching Post...</p>
{:then post}
    <div class="flex justify-between items-center">
        <div class="flex justify-between flex-col">
            <h1 class="text-4xl font-bold">{post.title}</h1>
        </div>
        <a href="/@/{post.userId}"><h3 class="font-semibold text-3xl text-center">{post.user}</h3></a>
    </div>
    {#if post.attachments}
        <hr class="mt-2 mb-2">
        <img class="w-full aspect-auto" src="{post.attachments}" alt="Attached image">
    {/if}
    <hr class="mt-2 mb-4">
    <p class="font-medium text-2xl">{post.body}</p>
    <hr class="mt-4 mb-2">
    <h3 class="mb-2 font-semibold">Comments...</h3>
    {#if commentSuccess}
        <div class="mb-4 p-2 rounded bg-green-600 text-white font-semibold">
            Comment created successfully!
        </div>
    {/if}
    <div class="justify-between flex mb-4">
        <textarea class="px-4 py-2 rounded-lg w-full text-black font-semibold mt-4 max-h-screen h-20" bind:value={body} placeholder="Write your comment here..." cols="40"></textarea>
        <button class=" text-center text-2xl mt-4 bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-900 cursor-pointer" on:click={submitComment}>Comment</button>
    </div>
    {#each post.comments as comment}
        <div class="bg-gray-700 p-4 shadow rounded-lg mb-4 hover:bg-gray-600 transition-transform ease-in">
            {#if comment.user === post.user}
                <p class="font-extrabold">{comment.user} [OP]</p>
            {:else}
                <p class="font-bold">{comment.user}</p>
            {/if}
            <p class="opacity-80">{comment.body}</p>
        </div>
    {/each}
{/await}
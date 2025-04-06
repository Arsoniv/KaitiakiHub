<script lang="ts">
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();
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
        <img class="max-w-full max-h-100" src="{post.attachments}" alt="">
    {/if}
    <hr class="mt-2 mb-4">
    <p class="font-medium text-2xl">{post.body}</p>
    <hr class="mt-4 mb-2">
    <h3 class="mb-2 font-semibold">Comments...</h3>
    {#each post.comments as comment}
        <div class="bg-gray-700 p-4 shadow rounded-lg mb-4 hover:bg-gray-600 transition-transform ease-in">
            {#if comment.user === post.user}
                <p class="font-extrabold">{comment.user} [OC]</p>
            {:else}
                <p class="font-bold">{comment.user}</p>
            {/if}
            <p class="opacity-80">{comment.body}</p>
        </div>
    {/each}
{/await}
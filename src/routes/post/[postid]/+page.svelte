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
    <hr class="mt-2 mb-2">
    <img class="max-w-full max-h-100" src="{post.attachments}" alt="Loading Image...">
    <hr class="mt-2 mb-2">
    <p class="font-medium text-2xl">{post.body}</p>
{/await}
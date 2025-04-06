<script lang="ts">
    import { pb } from "$lib/pocketbase";

    let title = '';
    let body = '';
    let fileList: FileList | null = null;
    let file: File | null = null;

    const submitPost = async () => {
        if (title && body && pb.authStore.record) {
            if (fileList && fileList.length > 0) {
                file = fileList[0];
            }
            try {
                const response = await pb.collection('posts').create({
                    title,
                    body,
                    poster: pb.authStore.record.id,
                    attachments: file
                });
            } catch (error) {
                console.error('Error creating post:', error);
                alert('Error creating post: '+ error);
            }
        } else {
            console.error('Title and body are required and you must be logged in.');
            alert('Title and body are required and you must be logged in.');
        }
    };
</script>

<div class="flex justify-center items-center flex-col">
    <h1 class="text-4xl font-semibold text-center mb-4">Writing a new post:</h1>
    <input class="px-4 py-2 rounded-lg w-full text-black font-semibold" type="text" bind:value={title} placeholder="Write your title here..."/>
    <input class="w-full text-center text-2xl mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 cursor-pointer" type="file" accept=".jpg,.png,.svg,.gif,.webp" bind:files={fileList}/>
    <textarea class="px-4 py-2 rounded-lg w-full text-black font-semibold mt-4 max-h-screen h-120" bind:value={body} placeholder="Write your body here..." cols="40"></textarea>
    <button class="w-full text-center text-3xl mt-4 bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-900 cursor-pointer" on:click={submitPost}>Post</button>
</div>

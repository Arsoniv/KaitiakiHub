import {pb} from "$lib/pocketbase";
import {error} from '@sveltejs/kit';

import type {PageLoad} from './$types';

type Post = {
    id: string;
    userId: string;
    title: string;
    body: string;
    user: string;
    attachments: string;
}

const getPost = async (postId: string): Promise<Post> => {
    const post = await pb.collection('posts').getOne(postId);

    const user = await pb.collection('users').getOne(post.poster);

    return {
        user: user.name,
        userId: user.id,
        title: post.title,
        body: post.body,
        id: post.id,
        attachments:  pb.files.getURL(post, post.attachments),
    };
};

export const load: PageLoad = async ({ params }) => {
    try {
        return { post: getPost(params.postid) };
    } catch (err) {
        throw error(500, 'Failed to load posts');
    }
};
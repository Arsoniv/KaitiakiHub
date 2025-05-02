import {pb} from "$lib/pocketbase";
import {error} from '@sveltejs/kit';

import type {PageLoad} from './$types';

type User = {
	id: string;
	name: string;
	created: string;
}
type Post = {
	id: string;
	userId: string;
	title: string;
	body: string;
	user: string;
}

const getUser = async (userId: string): Promise<User> => {
	const user = await pb.collection('users').getOne(userId); // gets database entries with pocketbase

	return {
		id: user.id,
		name: user.name,
		created: user.created
	};
};

const getPosts = async (userId: string): Promise<Post[]> => {
	const allPosts = await pb.collection('posts').getFullList({filter: `poster = "${userId}"`}); // gets database entries with pocketbase, filtering by user id

	//let all child promises resolve ( for the id and name)
	return await Promise.all(
		allPosts.map(async post => ({
			user: (await pb.collection('users').getOne(post.poster)).name, // gets database entries with pocketbase
			userId: (await pb.collection('users').getOne(post.poster)).id, // gets database entries with pocketbase
			title: post.title,
			body: post.body,
			id: post.id,
		}))
	);
};

export const load: PageLoad = async ({ params }) => {
	try {
		return { user: getUser(params.userid), posts: getPosts(params.userid) }; //returns both user info and the user's posts
	} catch (err) {
		throw error(500, 'Failed to load posts');
	}
};
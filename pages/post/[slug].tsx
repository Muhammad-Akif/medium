import { GetStaticProps } from 'next';
import React from 'react'
import Header from '../../components/Header'
import { sanityClient, urlFor } from "../../sanity";
import { post } from "../../typings"

interface Props {
    post: post;
}

const Post = ({ post }: Props) => {
    console.log("post ==> ", post)
    return (
        <main>
            <Header />

            <img
                className="w-full h-40 object-cover"
                src={urlFor(post.mainImage).url()!}
                alt="Post Image"
            />

            <article className="max-w-3xl mx-auto p-5">
                <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
                <h2 className="text-xl font-light  text-gray-500 mb-2">{post.description}</h2>

                <div>
                    <img
                        src={urlFor(post.author.image).url()!}
                        alt="author image"
                    />
                    <p>
                        Blog post by {" "}
                        <span>{post.author.name}</span> ~
                        Published at {new Date(post._createdAt).toLocaleString}
                    </p>
                </div>
            </article>
        </main>
    )
}

export default Post;

export const getStaticPaths = async () => {
    const query = `*[_type == "post"]{
        _id,
        slug {
          current
        }
      }`
    const posts = await sanityClient.fetch(query);
    const paths = posts.map((post: post) => ({
        params: {
            slug: post.slug.current,
        }
    }))

    return {
        paths,
        fallback: "blocking",
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        slug,
        description,
        mainImage,
        author -> {
        name,
        image},
        'comments': *[
          _type == "comment" && 
          post._ref == ^.id && 
          approved == true],
        body
      }`;

    const post = await sanityClient.fetch(query, {
        slug: params?.slug,
    })

    if (!post) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            post,
        },
        revalidate: 60, //after 60 second, it will update the old cached versions
    }
}


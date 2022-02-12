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

export const getStaticProps: GetStaticProps = async () => {
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
      
}


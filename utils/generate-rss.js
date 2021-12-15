import { Feed } from "feed";
import fs from "fs";

export default function generateRSSFeed(posts) {
  const baseUrl = "https://www.better.dev";

  const feed = new Feed({
    title: "Better Dev",
    description: "High quality coding tips and tricks.",
    id: baseUrl,
    link: baseUrl,
    language: "en",
    image:
      "https://res.cloudinary.com/betterdev/image/upload/v1624205028/logo_mxmlv8.png",
    favicon: `${baseUrl}/favicon.ico`,
    feedLinks: { rss2: `${baseUrl}/rss.xml` },
    author: {
      name: "Chris Sev",
      email: "chris@better.dev",
      link: "https://twitter.com/chris__sev",
    },
    copyright: "All rights reserved, Better Dev",
  });

  posts.forEach((post) => {
    const { title, content, description, slug, publishedAt, author } = post;
    const url = `${baseUrl}/${slug}`;

    feed.addItem({
      title,
      id: url,
      link: url,
      description,
      content,
      author: [
        {
          name: author.name,
          link: `${baseUrl}/hi/${post.author.username}`,
        },
      ],
      date: new Date(publishedAt),
    });
  });

  feed.addCategory("Technology");
  feed.addCategory("Programming");
  feed.addCategory("Web Development");
  feed.addCategory("JavaScript");

  fs.writeFileSync("public/rss.xml", feed.rss2());
}

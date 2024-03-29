import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import prism from "remark-prism";

import type { Post } from "@/lib/types";

export default async function getSinglePost(slug: string) {
	const markdownWithMeta = fs.readFileSync(
		path.join("blog-posts", `${slug}.md`),
		"utf-8"
	);

	const { data: frontmatter, content } = matter(markdownWithMeta);

	const processedContent = await remark()
		.use(remarkHtml, { sanitize: false })
		.use(prism)
		.process(content);
	const contentHtml = processedContent.toString();

	return {
		slug,
		frontmatter,
		content: contentHtml,
	} as Post;
}

import PostForm from "@/modules/admin/blog/components/blog-form";
import { createPost } from "../actions";


export default function NewPostPage() {
  return <PostForm action={createPost} />;
}

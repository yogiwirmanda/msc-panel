<template>
  <LoadingPage :visible="loading" message="Memproses Data Forum....." />
  <div class="max-w-2xl mx-auto p-6">
    <Card class="mb-6">
      <template #title
        ><div class="mb-5">{{ forum?.thread?.title }}</div></template
      >
      <template #content>
        <div class="text-md mb-10">
          {{ forum?.thread?.description }}
        </div>
        <div class="flex items-start gap-3">
          <Avatar icon="pi pi-user" size="large" class="bg-gray-300" />
          <Textarea
            v-model="newPost"
            rows="3"
            placeholder="Apa yang kamu pikirkan?"
            class="flex-1"
          />
        </div>
        <div class="flex justify-end mt-3">
          <Button label="Post" icon="pi pi-send" @click="addPost" />
        </div>
      </template>
    </Card>

    <div v-for="post in posts" :key="post.id" class="mb-6">
      <Card>
        <template #content>
          <div class="flex gap-3">
            <Avatar icon="pi pi-user" size="large" class="bg-indigo-400" />
            <div class="flex-1">
              <div class="font-bold">{{ post.user }}</div>
              <div class="text-black mb-2">
                {{ post.comment.body }}
              </div>

              <Button
                label="Reply"
                icon="pi pi-reply"
                text
                size="small"
                @click="toggleReplyBox(post)"
              />

              <div v-if="post.showReplyBox" class="mt-3">
                <Textarea
                  v-model="replyText"
                  rows="2"
                  placeholder="Tulis balasan..."
                  class="w-full"
                />
                <div class="flex justify-end mt-2">
                  <Button
                    label="Kirim Balasan"
                    size="small"
                    @click="addReply(post.comment.id)"
                  />
                </div>
              </div>

              <div
                v-if="post.replies.length"
                class="mt-4 space-y-3 border-l-2 pl-4"
              >
                <div
                  v-for="reply in post.replies"
                  :key="reply.id"
                  class="flex gap-3"
                >
                  <Avatar icon="pi pi-user" class="bg-pink-400" />
                  <div>
                    <div class="font-semibold">{{ reply.user }}</div>
                    <div class="text-black">
                      {{ reply.body }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Card from "primevue/card";
import Avatar from "primevue/avatar";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import { useForumStore } from "../../../stores/forumStore";
import Cookie from "js-cookie";
import LoadingPage from "../../../components/LoadingPage.vue";

interface Reply {
  id: number;
  user: string;
  text: string;
}

interface Post {
  id: number;
  user: string;
  text: string;
  replies: Reply[];
  showReplyBox: boolean;
  replyText: string;
}

const forumStore = useForumStore();
const newPost = ref("");
const replyText = ref("");
const posts = ref<any>();
const forum = ref<any>(null);
const loading = ref(false);

const loadForum = async () => {
  loading.value = true;
  await forumStore.getAllForum(1, 20, 0);
  if (forumStore.forumResponse) {
    forum.value = forumStore.forumResponse;
    posts.value = forumStore.forumResponse.items;
  }
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};

onMounted(async () => {
  loadForum();
});

let getUser = JSON.parse(String(Cookie.get("user")));

const addPost = async () => {
  if (!newPost.value.trim()) return;
  let payload = {
    user_id: getUser.id,
    body: newPost.value,
  };
  await forumStore.comment(1, payload);
  if (forumStore.submitComment) {
    console.log(forumStore.submitComment);
  }
  newPost.value = "";
};

const toggleReplyBox = (post: Post) => {
  post.showReplyBox = !post.showReplyBox;
};

const addReply = async (postId: number) => {
  let payload = {
    user_id: getUser.id,
    parent_id: postId,
    body: replyText.value,
  };
  await forumStore.reply(1, payload);
  if (forumStore.submitReply) {
    console.log(forumStore.submitReply);
  }
  replyText.value = "";
};
</script>

<style scoped>
.p-button.p-component {
  background-color: #774181 !important;
  color: #edebe9;
  border-color: #774181;
}
</style>

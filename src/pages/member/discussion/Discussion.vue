<template>
  <div class="max-w-2xl mx-auto p-6">
    <Card class="mb-6">
      <template #title><div class="mb-5">Diskusi Sesi 1</div></template>
      <template #content>
        <div class="text-md mb-10">
          Melalui forum diskusi, Anda dapat membagikan pengalaman dan dapat
          berinteraksi dengan peserta lain serta memberikan dukungan satu sama
          lain. Ruang diskusi ini aman dan privasi Anda akan terjaga.
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
                {{ post.text }}
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
                  v-model="post.replyText"
                  rows="2"
                  placeholder="Tulis balasan..."
                  class="w-full"
                />
                <div class="flex justify-end mt-2">
                  <Button
                    label="Kirim Balasan"
                    size="small"
                    @click="addReply(post)"
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
                      {{ reply.text }}
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
import { ref } from "vue";
import Card from "primevue/card";
import Avatar from "primevue/avatar";
import Textarea from "primevue/textarea";
import Button from "primevue/button";

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

const newPost = ref("");
const posts = ref<Post[]>([]);

const addPost = () => {
  if (!newPost.value.trim()) return;
  posts.value.unshift({
    id: Date.now(),
    user: "Member",
    text: newPost.value,
    replies: [],
    showReplyBox: false,
    replyText: "",
  });
  newPost.value = "";
};

const toggleReplyBox = (post: Post) => {
  post.showReplyBox = !post.showReplyBox;
};

const addReply = (post: Post) => {
  if (!post.replyText.trim()) return;
  post.replies.push({
    id: Date.now(),
    user: "Member",
    text: post.replyText,
  });
  post.replyText = "";
  post.showReplyBox = false;
};
</script>

<style scoped>
.p-button.p-component {
  background-color: #774181 !important;
  color: #edebe9;
  border-color: #774181;
}
</style>

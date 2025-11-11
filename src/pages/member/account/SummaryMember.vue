<template>
  <div class="container pb-10">
    <div class="mb-5">
      <HeaderProfile />
    </div>
    <div class="grid grid-cols-12 gap-5 px-10">
      <div class="col-span-3">
        <MenuProfile />
      </div>
      <div class="col-span-9">
        <Card>
          <template #title>Member Progress</template>
          <template #content>
            <div>
              <Timeline :value="practiceStep" class="w-full w-100">
                <template #content="slotProps" class="w-100">
                  <span class="font-bold">{{ slotProps.item.title }}</span> <br></br>
                  {{ formatStatus(slotProps.item.status) }}
                </template>
              </Timeline>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Card from "primevue/card";
import Timeline from "primevue/timeline";
import { onMounted, ref } from "vue";
import MenuProfile from "../../../components/pages/account/MenuProfile.vue";
import HeaderProfile from "../../../components/pages/account/HeaderProfile.vue";
import Cookie from "js-cookie";
import { usePracticeStore } from "../../../stores/practiceStore";

const loading = ref(false);
const practiceStore = usePracticeStore();
const practiceStep = ref<any>();

const getStepPractice = async () => {
  loading.value = true;
  let getUser = JSON.parse(String(Cookie.get("user")));
  await practiceStore.getPracticeStep(getUser.id);
  if (practiceStore.stepPractice?.success) {
    practiceStep.value = practiceStore.stepPractice?.data.practice_steps ?? [];
  }
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};


const formatStatus = (text: string) => {
  if (!text) return "";
  return text
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

onMounted(() => {
  getStepPractice();
});
</script>

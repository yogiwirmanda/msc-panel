<template>
  <div class="bg-surface-0 px-6 md:px-12 lg:px-20 py-20 text-center">
    <div class="flex flex-col gap-6">
      <div class="flex flex-col items-center gap-4 mb-[50px]">
        <div class="font-bold text-3xl leading-tight">
          <h2
            class="font-extrabold text-4xl md:text-5xl leading-tight tracking-tight drop-shadow-md"
          >
            Mindful Self-compassion
          </h2>
        </div>
        <p class="text-lg md:text-xl text-black/90 max-w-2xl">
          Pelatihan Mindful Self-Compassion (MSC) dirancang untuk membantu Anda
          menerima diri sendiri, mengelola emosi, dan membangun hubungan yang
          lebih sehat dengan diri sendiri dan orang lain.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div
          v-for="item in trainingList"
          :key="item.section"
          class="flex flex-col"
        >
          <Card
            class="rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <template #title>
              <div class="mb-1 text-2xl font-bold text-surface-900">
                Sesi {{ item.section }}
              </div>
              <div class="mb-3 text-lg text-surface-600 font-medium">
                {{ item.title }}
              </div>
            </template>

            <template #content>
              <div class="relative w-full overflow-hidden rounded-xl">
                <Image
                  :src="`/images/${item.image}`"
                  alt="Image"
                  imageClass="w-full h-56 object-cover rounded-xl"
                  preview
                />
              </div>

              <div class="mt-5 space-y-2 text-center">
                <div
                  class="text-surface-900 text-md font-normal leading-relaxed"
                >
                  {{ item.description }}
                </div>
              </div>
            </template>

            <template #footer>
              <div class="flex justify-center mt-4">
                <Button
                  label="Lihat Detail"
                  icon="pi pi-arrow-right"
                  class="px-4 py-2 rounded-lg bg-purple"
                  :onclick="goToSession"
                />
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";
import Image from "primevue/image";
import { useRouter } from "vue-router";

const router = useRouter();

const goToSession = () => {
  router.push("/member/session");
};

const trainingList = [
  {
    section: 1,
    title: "Menemukan Rasa Welas Asih Dengan Penuh Kesadaran",
    image: "1.jpg",
    description:
      "Sesi ini akan menjadi pengenalan umum tentang konsep self-compassion dan mindfulness. Anda akan belajar arti welas asih pada diri sendiri, bagaimana ia berbeda dari harga diri, dan manfaat yang akan didapatkan. Sesi ini juga akan mencakup praktik mindfulness seperti body scanning dan self-compassion break untuk membantu Anda terhubung dengan tubuh dan emosi mereka tanpa menghakimi.",
  },
  {
    section: 2,
    title: "Mengelola Emosi yang Sulit",
    image: "2.jpg",
    description:
      "Sesi ini berfokus pada pengembangan keterampilan untuk menghadapi emosi-emosi negatif seperti rasa malu atau emosi yang menyakitkan. Anda akan diajarkan strategi untuk menanggapi emosi dengan tenang, bukan langsung bereaksi terburu-buru. Latihan informal “Soften-Soothe-Allow” akan diajarkan untuk membantu Anda menenangkan diri ketika berada pada situasi yang menantang atau situasi yang sulit.",
  },
  {
    section: 3,
    title: "Menemukan Diri dengan Welas Asih pada Diri Sendiri",
    image: "3.png",
    description:
      "Di sesi ini, Anda akan diajak untuk mempelajari diri lebih mendalam melalui lensa self-compassion. Anda akan dilatih untuk memperhatikan sensasi tubuh dengan kesadaran dan kelembutan, bukan dengan kritik. Tujuan utamanya adalah untuk menerima kondisi tubuh apa adanya dan meredakan ketegangan yang sering kali muncul akibat citra tubuh yang negatif.",
  },
  {
    section: 4,
    title: "Mengubah Hubungan",
    image: "4.webp",
    description:
      "Sesi ini membahas bagaimana menghadapi hubungan yang penuh konflik dengan lebih welas asih. Anda akan belajar untuk memberikan kasih sayang kepada diri sendiri dan orang lain. Latihan yang relevan mencakup “Meditasi teman yang penuh kasih” dan “Menghadapi kebutuhan yang belum terpenuhi” dalam hubungan.",
  },
  {
    section: 5,
    title: "Merangkul Hidup",
    image: "5.png",
    description:
      "Sesi ini akan mengajak Anda untuk menghargai aspek-aspek positif dalam diri dan kehidupan. Anda akan melakukan Latihan yang berfokus pada penghargaan diri dan rasa syukur, yang merupakan bagian penting dari mindful self-compassion. Tujuan sesi ini adalah untuk membangun kebiasaan positif dan perspektif yang lebih penuh kasih terhadap hidup.",
  },
  {
    section: 6,
    title: "Mengintegrasikan Welas Asih ke dalam Kehidupan Sehari-hari",
    image: "6.png",
    description:
      "Sesi ini akan berfungsi sebagai penutup, di mana Anda akan menyatukan semua pembelajaran dari sesi-sesi sebelumnya. Diskusi akan berpusat pada bagaimana mengaplikasikan self-compassion dan mindfulness secara berkelanjutan dalam kehidupan sehari-hari, sehingga praktik ini menjadi bagian permanen dari kesejahteraan diri Anda.",
  },
];
</script>
<style>
.image-training-section {
  height: 300px;
  object-fit: cover;
}
</style>

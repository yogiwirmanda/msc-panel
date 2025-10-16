<script lang="ts" setup>
import Button from "primevue/button";
import Card from "primevue/card";
import DatePicker from "primevue/datepicker";
import InputText from "primevue/inputtext";
import RadioButton from "primevue/radiobutton";
import RadioButtonGroup from "primevue/radiobuttongroup";
import Select from "primevue/select";

import { onMounted, ref } from "vue";
import HeaderProfile from "../../../components/pages/account/HeaderProfile.vue";
import MenuProfile from "../../../components/pages/account/MenuProfile.vue";
import { useUserStore } from "../../../stores/userStore";
import Cookie from "js-cookie";
import type { RegisterForm } from "../../../types/auth";

const listProfession = ref([
  { name: "Pegawai Negeri Sipil", code: "PNS" },
  { name: "Pegawai Swasta", code: "PS" },
  { name: "Petani", code: "PTN" },
  { name: "Guru", code: "GR" },
  { name: "Dosen", code: "DSN" },
]);

const listEducation = ref([
  { name: "Sekolah Dasar", code: "SD" },
  { name: "Sekolah Menengah Pertama", code: "SMP" },
  { name: "Sekolah Menengah Atas", code: "SMA" },
  { name: "Diploma I", code: "DI" },
  { name: "Diploma II", code: "DII" },
  { name: "Diploma III", code: "DIII" },
  { name: "Diploma IV", code: "DIV" },
  { name: "S1", code: "S1" },
  { name: "S2", code: "S2" },
  { name: "S3", code: "S3" },
]);

const form = ref<RegisterForm>({
  name: "",
  nickname: "",
  username: "",
  phone_number: "",
  email: "",
  address: "",
  birthdate: "",
  gender: "",
  profession: null,
  last_education: null,
  consent: "",
});

const userStore = useUserStore();
const detailMember = ref();

const loadDetailMember = async () => {
  let getUser = JSON.parse(String(Cookie.get("user")));
  await userStore.getUserDetail(getUser.id);
  detailMember.value = userStore?.detailUser?.data;

  if (detailMember.value) {
    form.value = {
      ...form.value,
      name: detailMember.value.name || "",
      nickname: detailMember.value.nickname || "",
      username: detailMember.value.username || "",
      phone_number: detailMember.value.phone_number || "",
      email: detailMember.value.email || "",
      address: detailMember.value.address || "",
      birthdate: detailMember.value.birthdate || "",
      gender: detailMember.value.gender || "",
      profession: detailMember.value.profession || "",
      last_education: detailMember.value.last_education || "",
      consent: detailMember.value.consent || "",
    };
  }
};

const updateProfile = async () => {
  const birthdate = form.value.birthdate;
  const formatted = new Date(birthdate).toISOString().split("T")[0];
  const payload = {
    ...form.value,
    birthdate: formatted,
    last_education: form.value.last_education?.name,
    profession: form.value.profession?.name,
  };
  await userStore.updateUser(detailMember.value.id, payload);
};

onMounted(async () => {
  loadDetailMember();
});
</script>

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
          <template #title>Profile Information</template>
          <template #content>
            <form class="space-y-4" @submit.prevent="updateProfile">
              <div>
                <label for="name" class="block mb-2 font-medium"
                  >Nama Lengkap</label
                >
                <InputText
                  id="name"
                  v-model="form.name"
                  class="w-full"
                  placeholder="Nama Lengkap"
                  required
                />
              </div>
              <div>
                <label for="nickanme" class="block mb-2 font-medium"
                  >Nama Alias</label
                >
                <InputText
                  id="nickanme"
                  v-model="form.nickname"
                  class="w-full"
                  placeholder="Nama Alias"
                  required
                />
              </div>
              <div>
                <label for="username" class="block mb-2 font-medium"
                  >Nama Pengguna</label
                >
                <InputText
                  id="username"
                  v-model="form.username"
                  class="w-full"
                  placeholder="Nama Pengguna"
                  required
                />
              </div>
              <div>
                <label for="phone" class="block mb-2 font-medium"
                  >Nomor Telepon</label
                >
                <InputText
                  id="phone"
                  v-model="form.phone_number"
                  placeholder="081217018168"
                  class="w-full"
                />
              </div>
              <div>
                <label for="email" class="block mb-2 font-medium">Email</label>
                <InputText
                  id="email"
                  type="email"
                  v-model="form.email"
                  class="w-full"
                  placeholder="E-mail"
                  required
                />
              </div>
              <div>
                <label for="address" class="block mb-2 font-medium"
                  >Alamat</label
                >
                <InputText
                  id="address"
                  v-model="form.address"
                  class="w-full"
                  placeholder="Alamat"
                  :feedback="false"
                  :toggle-mask="true"
                  fluid
                  required
                />
              </div>
              <div>
                <label for="birthdate" class="block mb-2 font-medium"
                  >Tanggal Lahir</label
                >
                <DatePicker
                  name="date"
                  fluid
                  v-model="form.birthdate"
                  placeholder="Tanggal Lahir"
                />
              </div>
              <div>
                <label for="gender" class="block mb-2 font-medium"
                  >Jenis Kelamin</label
                >
                <RadioButtonGroup
                  name="ingredient"
                  class="flex flex-wrap gap-4"
                  v-model="form.gender"
                >
                  <div class="flex items-center gap-2">
                    <RadioButton inputId="male" value="male" />
                    <label for="male">Laki - Laki</label>
                  </div>
                  <div class="flex items-center gap-2">
                    <RadioButton inputId="female" value="female" />
                    <label for="female">Perempuan</label>
                  </div>
                </RadioButtonGroup>
              </div>
              <div>
                <label for="profession" class="block mb-2 font-medium"
                  >Profesi</label
                >
                <Select
                  name="profession"
                  :options="listProfession"
                  optionLabel="name"
                  placeholder="Pilih Profesi"
                  v-model="form.profession"
                  fluid
                />
              </div>
              <div>
                <label for="last_education" class="block mb-2 font-medium"
                  >Profesi</label
                >
                <Select
                  name="last_education"
                  :options="listEducation"
                  optionLabel="name"
                  placeholder="Pilih Pendidikan Terakhir"
                  v-model="form.last_education"
                  fluid
                />
              </div>
              <Button
                label="Update Profile"
                class="w-full py-2 rounded-lg flex justify-center items-center gap-2"
                type="submit"
              >
                <template #icon>
                  <i class="pi pi-sync text-base! leading-normal!" />
                </template>
              </Button>
            </form>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

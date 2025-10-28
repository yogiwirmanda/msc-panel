<template>
  <Toast />
  <div class="bg-surface-50 px-6 py-20 md:px-20 lg:px-80">
    <div
      class="bg-surface-0 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-lg mx-auto flex flex-col gap-8"
    >
      <div class="flex flex-col items-center gap-4">
        <Image src="/images/logo.webp" />
        <div class="flex flex-col items-center gap-2 w-full">
          <div
            class="text-surface-900 text-2xl font-semibold leading-tight text-center w-full"
          >
            Registrasi Akun
          </div>
          <div class="text-center">
            Sudah Punya Akun?
            <RouterLink to="/login" class="mt-5 text-blue-500"
              >Login</RouterLink
            >
          </div>
        </div>
      </div>

      <form class="flex flex-col gap-6 w-full" @submit.prevent="saveRegister">
        <div>
          <label for="name" class="block mb-2 font-medium">Nama Lengkap</label>
          <InputText
            id="name"
            v-model="form.name"
            class="w-full"
            placeholder="Nama Lengkap"
          />
          <small v-if="errors.name" class="text-red-500">{{
            errors.name
          }}</small>
        </div>
        <div>
          <label for="nickname" class="block mb-2 font-medium"
            >Nama Alias</label
          >
          <InputText
            id="nickname"
            v-model="form.nickname"
            class="w-full"
            placeholder="Nama Alias"
          />
          <small v-if="errors.nickname" class="text-red-500">{{
            errors.nickname
          }}</small>
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
          <small v-if="errors.phone_number" class="text-red-500">{{
            errors.phone_number
          }}</small>
        </div>
        <div>
          <label for="email" class="block mb-2 font-medium">Email</label>
          <InputText
            id="email"
            type="email"
            v-model="form.email"
            class="w-full"
            placeholder="E-mail"
          />
          <small v-if="errors.email" class="text-red-500">{{
            errors.email
          }}</small>
        </div>
        <div>
          <label for="password" class="block mb-2 font-medium"
            >Kata Sandi</label
          >
          <Password
            id="password"
            v-model="form.password"
            class="w-full"
            placeholder="Kata Sandi"
            :feedback="false"
            :toggle-mask="true"
            fluid
          />
          <small v-if="errors.password" class="text-red-500">{{
            errors.password
          }}</small>
        </div>
        <div>
          <label for="password_confirmation" class="block mb-2 font-medium"
            >Konfirmasi Kata Sandi</label
          >
          <Password
            id="password_confirmation"
            v-model="form.password_confirmation"
            class="w-full"
            placeholder="Konfirmasi Kata Sandi"
            :feedback="false"
            :toggle-mask="true"
            fluid
          />
          <small v-if="errors.password_confirmation" class="text-red-500">{{
            errors.password_confirmation
          }}</small>
        </div>
        <div>
          <label for="address" class="block mb-2 font-medium">Alamat</label>
          <InputText
            id="address"
            v-model="form.address"
            class="w-full"
            placeholder="Alamat"
          />
          <small v-if="errors.address" class="text-red-500">{{
            errors.address
          }}</small>
        </div>
        <div>
          <label for="birthdate" class="block mb-2 font-medium"
            >Tanggal Lahir</label
          >
          <DatePicker
            v-model="form.birthdate"
            placeholder="Tanggal Lahir"
            fluid
          />
          <small v-if="errors.birthdate" class="text-red-500">{{
            errors.birthdate
          }}</small>
        </div>
        <div>
          <label for="gender" class="block mb-2 font-medium"
            >Jenis Kelamin</label
          >
          <RadioButtonGroup v-model="form.gender" class="flex flex-wrap gap-4">
            <div class="flex items-center gap-2">
              <RadioButton inputId="male" value="male" />
              <label for="male">Laki - Laki</label>
            </div>
            <div class="flex items-center gap-2">
              <RadioButton inputId="female" value="female" />
              <label for="female">Perempuan</label>
            </div>
          </RadioButtonGroup>
          <small v-if="errors.gender" class="text-red-500">{{
            errors.gender
          }}</small>
        </div>
        <div>
          <label for="profession" class="block mb-2 font-medium">Profesi</label>
          <Select
            v-model="form.profession"
            :options="listProfession"
            optionLabel="name"
            placeholder="Pilih Profesi"
            fluid
          />
          <small v-if="errors.profession" class="text-red-500">{{
            errors.profession
          }}</small>
        </div>
        <div>
          <label for="last_education" class="block mb-2 font-medium"
            >Pendidikan Terakhir</label
          >
          <Select
            v-model="form.last_education"
            :options="listEducation"
            optionLabel="name"
            placeholder="Pilih Pendidikan Terakhir"
            fluid
          />
          <small v-if="errors.last_education" class="text-red-500">{{
            errors.last_education
          }}</small>
        </div>
        <Card>
          <template #content>
            <div class="text-base leading-relaxed mb-4 agreement-text">
              Saya dengan ini menyatakan bahwa saya telah membaca dan memahami
              informasi mengenai pelatihan mindful self-compassion. <br /><br />
              Saya mengerti bahwa partisipasi saya bersifat sukarela dan saya
              memiliki hak untuk menarik diri dari pelatihan ini kapan saja
              tanpa konsekuensi negatif. Saya juga memahami bahwa data yang saya
              berikan akan dijaga kerahasiaannya. <br /><br />
              Dengan mencentang kotak di bawah ini, saya menyetujui syarat dan
              ketentuan di atas.
            </div>
            <div class="flex items-center gap-2">
              <Checkbox v-model="form.consent" :binary="true" inputId="agree" />
              <label for="agree" class="text-sm"
                >Saya menyetujui syarat dan ketentuan di atas</label
              >
            </div>
            <small v-if="errors.consent" class="text-red-500">{{
              errors.consent
            }}</small>
          </template>
        </Card>
        <Button
          label="Register"
          icon="pi pi-user"
          class="w-full py-2 rounded-lg flex justify-center items-center gap-2"
          type="submit"
        >
          <template #icon>
            <UserCircleIcon class="w-5 h-5" />
          </template>
        </Button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "primevue/button";
import Card from "primevue/card";
import Checkbox from "primevue/checkbox";
import DatePicker from "primevue/datepicker";
import Image from "primevue/image";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import RadioButton from "primevue/radiobutton";
import RadioButtonGroup from "primevue/radiobuttongroup";
import Select from "primevue/select";
import Toast from "primevue/toast";

import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useToast } from "primevue/usetoast";
import { UserCircleIcon } from "@heroicons/vue/24/outline";
import * as yup from "yup";
import { useAuthStore } from "../../stores/auth";
import type { RegisterForm } from "../../types/register";

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

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
  phone_number: "",
  email: "",
  password: "",
  password_confirmation: "",
  address: "",
  birthdate: "",
  gender: "",
  profession: null,
  last_education: null,
  consent: false,
});

const errors = ref<Record<string, string>>({});

const schema = yup.object({
  name: yup.string().required("Nama Lengkap wajib diisi"),
  nickname: yup.string().required("Nama Alias wajib diisi"),
  phone_number: yup
    .string()
    .matches(/^[0-9]+$/, "Nomor telepon harus angka")
    .min(10, "Nomor telepon minimal 10 digit")
    .required("Nomor Telepon wajib diisi"),
  email: yup
    .string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  password: yup
    .string()
    .min(9, "Kata sandi minimal 9 karakter")
    .required("Kata sandi wajib diisi"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Konfirmasi kata sandi tidak cocok")
    .required("Konfirmasi kata sandi wajib diisi"),
  address: yup.string().required("Alamat wajib diisi"),
  birthdate: yup.date().required("Tanggal lahir wajib diisi"),
  gender: yup.string().required("Pilih jenis kelamin"),
  profession: yup.object().required("Pilih profesi"),
  last_education: yup.object().required("Pilih pendidikan terakhir"),
  consent: yup
    .boolean()
    .oneOf([true], "Anda harus menyetujui syarat dan ketentuan"),
});

const saveRegister = async () => {
  errors.value = {};

  try {
    await schema.validate(form.value, { abortEarly: false });

    const birthdate = form.value.birthdate;
    const formatted = new Date(birthdate).toISOString().split("T")[0];
    const payload = {
      ...form.value,
      birthdate: formatted,
      username: form.value.nickname,
      last_education: form.value.last_education?.name,
      profession: form.value.profession?.name,
      consent: { msc_consent: { value: !!form.value.consent } },
    };

    const success = await authStore.registerMember(payload);
    if (success) {
      toast.add({
        severity: "success",
        summary: "Registrasi Berhasil",
        life: 3000,
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  } catch (err: any) {
    console.log(err);
    if (err.inner) {
      err.inner.forEach((e: any) => {
        errors.value[e.path] = e.message;
      });
    } else {
      toast.add({
        severity: "error",
        summary: "Validasi Gagal",
        detail: err.message,
        life: 4000,
      });
    }
  }
};
</script>

<style scoped>
.agreement-text {
  max-height: 100px;
  overflow-y: auto;
  padding-right: 0.5rem;
}
.text-red-500 {
  color: #ef4444;
  font-size: 0.875rem;
}
</style>

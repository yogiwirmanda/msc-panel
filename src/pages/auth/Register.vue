<template>
  <div class="bg-surface-50 px-6 py-20 md:px-20 lg:px-80">
    <div
      class="bg-surface-0 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-lg mx-auto flex flex-col gap-8"
    >
      <div class="flex flex-col items-center gap-4">
        <div class="flex items-center gap-4">
          <Image src="../../../public/images/logo.webp" />
        </div>
        <div class="flex flex-col items-center gap-2 w-full">
          <div
            class="text-surface-900 text-2xl font-semibold leading-tight text-center w-full"
          >
            Register Account
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-6 w-full">
        <form class="space-y-4" @submit.prevent="saveregister">
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
              required
            />
          </div>
          <div>
            <label for="password" class="block mb-2 font-medium"
              >Konfirmasi Kata Sandi</label
            >
            <Password
              id="password"
              v-model="form.password_confirmation"
              class="w-full"
              placeholder="Konfrimasi Kata Sandi"
              :feedback="false"
              :toggle-mask="true"
              fluid
              required
            />
          </div>
          <div>
            <label for="address" class="block mb-2 font-medium">Alamat</label>
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
          <Card>
            <template #content>
              <div class="text-base leading-relaxed mb-4 agreement-text">
                Saya dengan ini menyatakan bahwa saya telah membaca dan memahami
                informasi mengenai pelatihan mindful self-compassion.<br /><br />
                Saya mengerti bahwa partisipasi saya bersifat sukarela dan saya
                memiliki hak untuk menarik diri dari pelatihan ini kapan saja
                tanpa konsekuensi negatif. Saya juga memahami bahwa data yang
                saya berikan dalam kuesioner dan jurnal akan dijamin
                kerahasiaannya. Data tersebut akan disajikan dalam bentuk anonim
                atau agregat, sehingga identitas pribadi saya tidak akan
                terungkap.<br /><br />
                Saya juga menyadari bahwa program ini adalah alat bantu dan
                bukan pengganti dari terapi profesional. Saya bertanggung jawab
                penuh atas kesehatan mental dan fisik saya selama mengikuti
                pelatihan.<br /><br />
                Dengan mencentang kotak di bawah ini, saya menyetujui syarat dan
                ketentuan di atas.
              </div>

              <div class="flex align-items-center gap-2">
                <Checkbox
                  v-model="form.consent"
                  :binary="true"
                  inputId="agree"
                />
                <label for="agree" class="text-sm"
                  >Saya menyetujui syarat dan ketentuan di atas</label
                >
              </div>
            </template>
          </Card>
          <Button
            label="Register"
            icon="pi pi-user"
            class="w-full py-2 rounded-lg flex justify-center items-center gap-2"
            type="submit"
          >
            <template #icon>
              <i class="pi pi-user text-base! leading-normal!" />
            </template>
          </Button>
        </form>
      </div>
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

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const agreed = ref(false);
const router = useRouter();

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

interface RegisterForm {
  name: string;
  nickname: string;
  username: string;
  phone_number: string;
  email: string;
  password: string;
  password_confirmation: string;
  address: string;
  birthdate: any;
  gender: string;
  profession: string;
  last_education: string;
  consent: string;
}

const form = ref<RegisterForm>({
  name: "",
  nickname: "",
  username: "",
  phone_number: "",
  email: "",
  password: "",
  password_confirmation: "",
  address: "",
  birthdate: "",
  gender: "",
  profession: "",
  last_education: "",
  consent: "",
});

const authStore = useAuthStore();

const saveregister = async () => {
  const birthdate = form.value.birthdate;
  const formatted = new Date(birthdate).toISOString().split("T")[0];
  const payload = {
    ...form.value,
    birthdate: formatted,
    last_education: form.value.last_education.name,
    profession: form.value.profession.name,
    consent: {
      msc_consent: {
        value: !!form.value.consent,
      },
    },
  };
  console.log("Profile saved:", payload);
  await authStore.registerMember(payload);
};
</script>

<style scoped>
.agreement-text {
  max-height: 100px;
  overflow-y: auto;
  padding-right: 0.5rem;
}
</style>

<template>
  <Toast />
  <div
    class="bg-surface-50 px-6 py-20 md:px-20 lg:px-80 h-screen flex justify-center items-center"
  >
    <div
      class="bg-surface-0 p-8 md:p-12 shadow-sm rounded-2xl w-full max-w-sm mx-auto flex flex-col gap-8"
    >
      <div class="flex flex-col items-center gap-4">
        <div class="flex items-center gap-4">
          <Image src="/images/logo.webp" />
        </div>
        <div class="flex flex-col items-center gap-2 w-full">
          <div
            class="text-surface-900 text-2xl font-semibold leading-tight text-center w-full"
          >
            🎉 Email sedang dalam perjalanan! <br></br>
          </div>
          <div class="text-md text-center mt-2">Cek inbox kamu (atau folder spam) buat link reset password.
Yuk lanjut ubah password biar bisa login lagi!</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Image from 'primevue/image';

</script>

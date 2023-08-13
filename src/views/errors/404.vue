<template>
  <div style="width: 500px; height: 100%; margin: 0 auto; padding-top: 10%">
    <p>请您使用 {{ officeTitle }} 系统。</p>
    <p style="color: dodgerblue">
      <a :href="HomeURL">{{ officeTitle }}</a>
    </p>
  </div>
</template>

<script setup>
const HomeURL = '/'
const officeTitle = 'EAP'
</script>

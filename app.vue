<template>
<div class="container mx-auto">
  <div>test</div>
  <div>test</div>
  <div>test</div>
  <div>test</div>
  <div>test</div>
  <div>test</div>
</div>
</template>
<style lang="css">
.container div {
  width: 100px;
  height: 100px;
  background-color: #4a90e2;
  margin: 10px;
  display: inline-block;
  border-radius: 8px;
  display: grid;
  place-items: center;
  color: white;
  font-size: 20px;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
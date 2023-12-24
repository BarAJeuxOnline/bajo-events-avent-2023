<template>
  <div relative m-4 p-8 text-center font-bold text-gray-700>
    <div relative z-1>
      <slot />
    </div>
    <div absolute inset-x--7 inset-y-0 cutted-edge-amber-400 />
    <div absolute inset-0 from-amber-400 via-amber-700 to-amber-400 bg-gradient-linear bg-gradient-to-r content-empty />
  </div>
</template>

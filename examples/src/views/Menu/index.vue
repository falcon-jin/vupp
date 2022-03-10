<template>
<div class="container">
  <v-menu :data="data1" defaultActive="2"></v-menu> <br>
  <v-infinite-menu 
    :data="data2" 
    defaultActive="/"
    :style="{width: '200px'}"
  ></v-infinite-menu> <br>

  <v-menu 
    :data="data3" 
    defaultActive="2" 
    name="a"
    index="b"
    icon="c"
    children="d"
  ></v-menu> <br>
  
  <v-infinite-menu 
    :data="data3" 
    defaultActive="/"
    name="a"
    index="b"
    icon="c"
    children="d"
  ></v-infinite-menu> 
</div>
  
</template>

<script setup lang='ts'>
let data1 = [
  {
    name: '导航1',
    index: '1',
    icon: 'document'
  },
  {
    name: '导航2',
    index: '2',
    icon: 'document'
  },
  {
    name: '导航3',
    index: '3',
    icon: 'document',
    children: [
      {
        name: '子导航3-1',
        index: '3-1',
        icon: 'document', 
      },
      {
        name: '子导航3-2',
        index: '3-2',
        icon: 'document', 
      },
    ]
  },
]

let data2 = [
  {
    name: '导航1',
    index: '1',
    icon: 'Document'
  },
  {
    name: '导航2',
    index: '2',
    icon: 'Document'
  },
  {
    name: '导航3',
    index: '3',
    icon: 'Document',
    children: [
      {
        name: '子导航3-1',
        index: '3-1',
        icon: 'Document', 
      },
      {
        name: '子导航3-2',
        index: '3-2',
        icon: 'Document', 
        children: [
          {
            name: '子导航3-2-1',
            index: '3-2-1',
            icon: 'Document', 
          },
          {
            name: '子导航3-2-2',
            index: '3-2-2',
            icon: 'Document', 
            children: [
              {
                name: '子导航3-2-2-1',
                index: '3-2-2-1',
                icon: 'Document', 
              },
              {
                name: '子导航3-2-2-2',
                index: '3-2-2-2',
                icon: 'Document', 
              },
            ]
          },
        ]
      },
    ]
  },
]

let data3 = [
  {
    a: '导航1',
    b: '1',
    c: 'Document'
  },
  {
    a: '导航2',
    b: '2',
    c: 'Document'
  },
  {
    a: '导航3',
    b: '3',
    c: 'Document',
    d: [
      {
        a: '子导航3-1',
        b: '3-1',
        c: 'Document', 
      },
      {
        a: '子导航3-2',
        b: '3-2',
        c: 'Document', 
      },
    ]
  },
]
</script>

<style lang='scss' scoped>
.container {
  width: 200px;  
}
</style>

<!--
 * @Description: 
 * @Author: Amber
 * @Date: 2023-08-12 15:09:45
 * @LastEditTime: 2023-08-12 15:43:36
 * @LastEditors: Amber
-->
<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  icon : {
    type: String,
    default: null
  }
})
const btnRef = ref(null)
const btnWrapRef = ref(null)
const init = () => {
  const docStyle = btnWrapRef.value.style
  const boundingClientRect = btnRef.value.getBoundingClientRect()
  btnRef.value.onmousemove = function(e) {
    console.log(e.clientX,  boundingClientRect.left)
    const x = e.clientX - boundingClientRect.left
    const y = e.clientY - boundingClientRect.top
    const xc = boundingClientRect.width/2
    const yc = boundingClientRect.height/2
    
    const dx = x - xc
    const dy = y - yc
    
    docStyle.setProperty('--rx', `${ dy/-1 }deg`)
    docStyle.setProperty('--ry', `${ dx/10 }deg`)
    
  }
  
  btnRef.value.onmouseleave = function(e) {
    docStyle.setProperty('--ty', '0')
    docStyle.setProperty('--rx', '0')
    docStyle.setProperty('--ry', '0')
  }
  btnRef.value.onmousedown = function(e) {
    docStyle.setProperty('--tz', '-25px')
  }
  document.body.onmouseup = function(e) {
    docStyle.setProperty('--tz', '-12px')
  }
}
onMounted(() => {
  init()
})

</script>
<template>
  <div ref="btnWrapRef">
    <a-button class="animation-btn" ref="btnRef" :data-title="text">
      <icon v-if="icon" :icon="icon" />
    </a-button>
  </div>
</template>
<style lang="scss" scoped>
.animation-btn {
	position: relative;
	display: inline-block;
	text-decoration: none;
	text-align: center;
	cursor: pointer;
	user-select: none;
	color: white;
  border: 0 solid;
  &:hover{
    border: 0 solid;
    color: white;
  }
	text{
    position: relative;
    z-index: 2;
  }
	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: linear-gradient(135deg, #6e8efb, #a777e3);
		border-radius: 4px;
		transition: box-shadow .5s ease, transform .2s ease; 
		will-change: transform;
		box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
		transform:
			translateY(var(--ty, 0))
			rotateX(var(--rx, 0))
			rotateY(var(--ry, 0))
			translateZ(var(--tz, -12px));
	}
	
	&:hover::before {
		box-shadow: 0 5px 15px rgba(0, 0, 0, .3);
	}
	
	&::after {
		position: relative;
		display: inline-block;
		content: attr(data-title);
		transition: transform .2s ease; 
		font-weight: bold;
		letter-spacing: .01em;
		will-change: transform;
		transform:
			translateY(var(--ty, 0))
			rotateX(var(--rx, 0))
			rotateY(var(--ry, 0));
	}
}
</style>
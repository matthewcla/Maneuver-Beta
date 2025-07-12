import { test, expect } from 'vitest'

function relativeSituation(a: {x:number,y:number,course:number}, b:{x:number,y:number,course:number}){
  const brg=(Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI+360)%360;
  const diffHdgs=Math.abs(((a.course - b.course + 540)%360)-180);
  if(diffHdgs>150&&diffHdgs<210) return 'HEAD_ON';
  const relBrg=(brg - a.course + 360)%360;
  if(relBrg>112.5&&relBrg<247.5) return 'OVERTAKING';
  if(relBrg>0&&relBrg<112.5) return 'CROSS_GIVEWAY';
  if(relBrg>=247.5) return 'CROSS_STANDON';
  return 'OTHER';
}

test('port crossing returns CROSS_STANDON',()=>{
  const own={x:0,y:0,course:0};
  const tgt={x:-1,y:0.5,course:90};
  expect(relativeSituation(own,tgt)).toBe('CROSS_STANDON');
})

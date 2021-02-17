//キャンバス
var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d");

var canvasWidth = 600;
var canvasHeight = 600;
canvas.width=canvasWidth;
canvas.height=canvasHeight;

//オブジェクト
var angle = 0;
var rad = 0;
var cx;
var cy;
var loop;
var gensoku=0;

rouletteimg.onload = startGamen;

function init(){
  angle = 0;
  rad = 0;
  gensoku = 0;
}

function startGamen(){
  canvas.removeEventListener("click",startGamen);
  init();

  ctx.clearRect(0,0,canvasWidth,canvasHeight);
  ctx.drawImage(rouletteimg,0,0,canvasWidth,canvasHeight);
  ctx.drawImage(hariimg,canvasWidth/2-22,40,50,100);

  canvas.addEventListener("click",start);
}

function start(){
  canvas.removeEventListener("click",start);
  ctx.clearRect(0,0,canvasWidth,canvasHeight);
  update();
  canvas.addEventListener("click",stop);
}

function stop(){
  canvas.removeEventListener("click",stop);
  gensoku = 0.1;
}

function kekka(){
  cancelAnimationFrame(loop);

  if(angle<10) ctx.drawImage(ooatariimg,30,canvasHeight/2-50,canvasWidth-60,150);
  else if(angle>=10 && angle<=117) ctx.drawImage(hazureimg,30,canvasHeight/2-30,canvasWidth-60,100);
  else if (angle>117 && angle<179) ctx.drawImage(atariimg,30,canvasHeight/2-50,canvasWidth-60,100);
  else if (angle>=179 && angle <= 299) ctx.drawImage(hazureimg,30,canvasHeight/2-50,canvasWidth-60,100);
  else if (angle>299) ctx.drawImage(atariimg,30,canvasHeight/2-50,canvasWidth-60,100);

  canvas.addEventListener("click",startGamen);
}

function update(){
  if(gensoku>19.9 && gensoku!=20) {
    gensoku = 20;
    setTimeout(kekka,1500);
  }
  else if(gensoku>0 && gensoku<20) gensoku+=0.1;

  ctx.clearRect(0,0,canvasWidth,canvasHeight);
  // 角度をラジアンに変換
  rad = angle * Math.PI/180;

  ctx.save();
  // 回転の中心位置を計算（画像の中心を回転中心にする）
  cx = canvasWidth/2;
  cy = canvasHeight/2;

  // 画像を回転
  ctx.setTransform(Math.cos(rad), Math.sin(rad), -Math.sin(rad), Math.cos(rad),cx-cx*Math.cos(rad)+cy*Math.sin(rad),cy-cx*Math.sin(rad)-cy*Math.cos(rad));
  ctx.drawImage(rouletteimg, 0, 0,canvasWidth,canvasHeight);

  ctx.restore();

  ctx.drawImage(hariimg,canvasWidth/2-22,40,50,100);
  // 回転角度を変化させる
  angle += 20 - gensoku;
  if(angle > 360) angle = 0;

  loop = requestAnimationFrame(update);
}
//9,10,117,118,178,179,299,300

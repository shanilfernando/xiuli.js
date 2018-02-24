import { Mat4, Vec3 } from './matrix';

export function steps(secTr, i) {
  const tr = secTr;
  tr[12] = 600;
  tr[13] = -400 * i;
  tr[14] = -400 * i;
  return tr;
}

export function circular(secTr, i) {
  const thita = (6.28319 * (i)) / 6;
  const tr = secTr;
  tr[12] = 600 * Math.sin(thita);
  tr[13] = 200;
  tr[14] = 800 * (Math.cos(thita) - 1);
  return tr;
}

export function spiralSteps(secTr, i, els) {
  const tr = secTr;
  const thita = (6.28319 * (i)) / els.length;
  Mat4.rotate(secTr, thita - 1.5708, Vec3.fromValues(0, 1, 0), secTr);
  tr[12] = 500 * Math.sin(thita);
  tr[13] = -400 * i;
  tr[14] = 500 * (Math.cos(thita) - 1);
  return tr;
}

export function spiralRotated(secTr, i) {
  const tr = secTr;
  const thita = (6.28319 * (i)) / 6;
  Mat4.rotate(secTr, thita, Vec3.fromValues(0, 1, 0), secTr);
  tr[12] = 600 * Math.sin(thita);
  tr[13] = 200 * i;
  tr[14] = 600 * (Math.cos(thita) - 1);
  return secTr;
}

export function poly(secTr, i) {
  const tr = secTr;
  const thita = (6.28319 * (i)) / 6;
  Mat4.rotate(secTr, thita, Vec3.fromValues(0, 1, 0), secTr);
  tr[12] = 600 * Math.sin(thita);
  tr[13] = 200;
  tr[14] = 600 * (Math.cos(thita) - 1);
  return secTr;
}

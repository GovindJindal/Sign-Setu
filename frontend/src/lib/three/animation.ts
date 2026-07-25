/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import * as words from '../../Animations/words';
import * as alphabets from '../../Animations/alphabets';

export function updateWordList(data: string[], ref: any) {
  if (!data || data.length === 0) return;

  const fullSentence = data.join(' ').toUpperCase();
  ref.animations.push(['add-text', fullSentence]);

  for (let word of data) {
    const upperWord = word.toUpperCase();

    if ((words as any)[upperWord]) {
      (words as any)[upperWord](ref);
    } else {
      for (let ch of word) {
        const upperCh = ch.toUpperCase();
        if ((alphabets as any)[upperCh]) {
          (alphabets as any)[upperCh](ref);
        }
      }
    }
  }
}

export function animateFrame(ref: any, labelId: string) {
  if (ref.animations.length === 0) {
    ref.pending = false;
    return;
  }

  const label = document.getElementById(labelId);

  if (ref.animations[0].length) {
    if (!ref.flag) {
      if (ref.animations[0][0] === 'add-text') {
        if (label) label.textContent = ref.animations[0][1];
        ref.animations.shift();
      } else {
        for (let i = 0; i < ref.animations[0].length;) {
          let [boneName, action, axis, limit, sign] = ref.animations[0][i];
          const bone = ref.avatar?.getObjectByName(boneName);

          if (bone) {
            if (sign === '+' && bone[action][axis] < limit) {
              bone[action][axis] += ref.speed;
              bone[action][axis] = Math.min(bone[action][axis], limit);
              i++;
            } else if (sign === '-' && bone[action][axis] > limit) {
              bone[action][axis] -= ref.speed;
              bone[action][axis] = Math.max(bone[action][axis], limit);
              i++;
            } else {
              ref.animations[0].splice(i, 1);
            }
          } else {
            ref.animations[0].splice(i, 1);
          }
        }
      }
    }
  } else {
    ref.animations.shift();
    if (ref.pause > 0) {
      ref.flag = true;
      setTimeout(() => {
        ref.flag = false;
      }, ref.pause);
    } else {
      ref.flag = false;
    }
  }
}

package com.jammin.util;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class HangulUtil {
    public List<Hangul> hangulSplit(String s) {

		List<Hangul> hangulList = new ArrayList<Hangul>();
		Hangul hangul = null;
        // typo스트링의 글자수 만큼 list에 담아둡니다.
		for (int i = 0; i < s.length(); i++) {
			hangul = new Hangul();
			hangul.setWord(String.valueOf(s.charAt(i)));
			char comVal = (char) (s.charAt(i)-0xAC00);
			if (comVal >= 0 && comVal <= 11172){
				char uniVal = (char)comVal;
				char cho = (char) ((((uniVal - (uniVal % 28)) / 28) / 21) + 0x1100);
				char jung = (char) ((((uniVal - (uniVal % 28)) / 28) % 21) + 0x1161);
				char jong = (char) ((uniVal % 28) + 0x11a7);
				if(cho!=4519){
					hangul.setChosung(String.valueOf(cho));
				}
				if(jung!=4519){
					hangul.setJungsung(String.valueOf(jung));						
				}
				if(jong!=4519){
					hangul.setJongsung(String.valueOf(jong));
				}
				if(hangul.getJongsung() == null){
					hangul.setJongsungEmpty(true);
				}else{
					hangul.setJongsungEmpty(false);
				}
				hangul.setErrorFlag(false);
			} else {
				comVal = (char) (comVal+0xAC00);
				hangul.setErrorFlag(true);
			}
			hangulList.add(hangul);
		}

        return hangulList;
    }

    public boolean isHangul(String str) {
        boolean checkFlag = true;
        for (char c : str.toCharArray()) {
            if (Character.UnicodeBlock.of(c) == Character.UnicodeBlock.HANGUL_SYLLABLES) {
                continue;
            }else{
                checkFlag = false;
            }
        }
        return checkFlag;
    }
    
}

package com.jammin.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.text.SimpleDateFormat;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.jammin.controller.TestRestController;

@Component
public class HangulUtil {

	private static final Logger log = LoggerFactory.getLogger(TestRestController.class);
	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

	private char[] specialTypeArray = {' ', '.', ',', '?', '!'};
	private char[] numberTypeArray = {'1', '2', '3', '4', '5', '6', '7', '8', '9', '0'};
	
    public List<Hangul> hangulSplit(String s) {
		log.info("{} >> HangulUtil.hangulSplit(String {})", new Object[]{dateFormat.format(new Date()), s});
		List<Hangul> hangulList = new ArrayList<Hangul>();
		Hangul hangul = null;
		for (int i = 0; i < s.length(); i++) {
			hangul = new Hangul();
			if(isSpecialType(s.charAt(i)) || isNumberType(s.charAt(i))){
				hangul.setSpecialFlag(true);
				hangul.setSpecialType(String.valueOf(s.charAt(i)));
				hangul.setSpecialTypeCode(s.charAt(i));
				hangulList.add(hangul);
				continue;
			}
			hangul.setWord(String.valueOf(s.charAt(i)));
			char comVal = (char) (s.charAt(i)-0xAC00);
			if (comVal >= 0 && comVal <= 11172){
				char uniVal = (char)comVal;
				char cho = (char) ((((uniVal - (uniVal % 28)) / 28) / 21) + 0x1100);
				char jung = (char) ((((uniVal - (uniVal % 28)) / 28) % 21) + 0x1161);
				char jong = (char) ((uniVal % 28) + 0x11a7);
				if(cho!=4519){
					hangul.setChosung(String.valueOf(cho));
					hangul.setChoCode(cho);
				}
				if(jung!=4519){
					hangul.setJungsung(String.valueOf(jung));	
					hangul.setJungCode(jung);					
				}
				if(jong!=4519){
					hangul.setJongsung(String.valueOf(jong));
					hangul.setJongCode(jong);
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
            if (Character.UnicodeBlock.of(c) == Character.UnicodeBlock.HANGUL_SYLLABLES || isSpecialType(c) || isNumberType(c) ) {
                continue;
            }else{
                checkFlag = false;
            }
        }
        return checkFlag;
    }

	private boolean isSpecialType(char c){
		boolean checkSpecialTypeFlag = false;
		for(char specialType : specialTypeArray){
			if(specialType == c){
				return true;
			}
		}
		return checkSpecialTypeFlag;
	}

	private boolean isNumberType(char c){
		boolean checkFlag = false;
		for(char numberType : numberTypeArray){
			if(numberType == c){
				return true;
			}
		}
		return checkFlag;
	}
    
}

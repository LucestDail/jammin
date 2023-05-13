package com.jammin.util;

import java.util.HashMap;

import org.json.simple.JSONObject;

public class Hangul {

    private String word;
    private String chosung;
    private int choCode;
    private String jungsung;
    private int jungCode;
    private String jongsung;
    private int jongCode;
    private String specialType;
    private Boolean errorFlag = false;
    private Boolean emptyJongsung = true;
    private Boolean specialFlag = false;
    private int specialTypeCode;

    public void setErrorFlag(Boolean errorFlag){
        this.errorFlag = errorFlag;
    }

    public void setSpecialFlag(Boolean specialFlag){
        this.specialFlag = specialFlag;
    }

    public void setSpecialType(String specialType){
        this.specialType = specialType;
    }

    public void setWord(String word){
        this.word = word;
    }

    public void setChosung(String chosung){
        this.chosung = chosung;
    }

    public void setJungsung(String jungsung){
        this.jungsung = jungsung;
    }

    public void setJongsung(String jongsung){
        this.jongsung = jongsung;
    }

    public void setChoCode(int choCode){
        this.choCode = choCode;
    }

    public void setJungCode(int jungCode){
        this.jungCode = jungCode;
    }

    public void setJongCode(int jongCode){
        this.jongCode = jongCode;
    }

    public void setJongsungEmpty(Boolean JongsungFlag){
        this.emptyJongsung = JongsungFlag;
    }

    public void setSpecialTypeCode(int specialTypeCode){
        this.specialTypeCode = specialTypeCode;
    }

    public String getChosung(){
        return this.chosung;
    }

    public String getJungSung(){
        return this.jungsung;
    }

    public String getJongsung(){
        return this.jongsung;
    }

    public int getChoCode(){
        return this.choCode;
    }

    public int getJungCode(){
        return this.jungCode;
    }

    public int getJongCode(){
        return this.jongCode;
    }

    public int getSpecialTypeCode(){
        return this.specialTypeCode;
    }

    public String getWord(){
        return this.word;
    }

    public String toString(){
        if(this.errorFlag){
            return "word:" + this.word + "(한글이 아닙니다)";
        }else{
            return "word:" + this.word + ",chosung:" + this.chosung + ",jungsung:" + this.jungsung + (!this.emptyJongsung ? ",jongsung:" + this.jongsung : "") + "|";
        }
    }

    public JSONObject toJSON(){
        HashMap hashMap = new HashMap<String, String>();
        hashMap.put("specialFlag", this.specialFlag);
        if(this.specialFlag){
            hashMap.put("specialType",this.specialType);
            hashMap.put("specialTypeCode",this.specialTypeCode);
        }else{
            hashMap.put("word", this.word);
            hashMap.put("chosung", this.chosung);
            hashMap.put("choCode", this.choCode);
            hashMap.put("jungsung", this.jungsung);
            hashMap.put("jungCode", this.jungCode);
            if(!this.emptyJongsung){
                hashMap.put("jongsung", this.jongsung);
                hashMap.put("jongCode", this.jongCode);
            }
        }
        hashMap.put("emptyJongsung", this.emptyJongsung);
        hashMap.put("errorFlag", this.errorFlag);
        return new JSONObject(hashMap);
    }
}

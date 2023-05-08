package com.jammin.util;

import java.util.HashMap;

import org.json.simple.JSONObject;

public class Hangul {

    private String word;
    private String chosung;
    private String jungsung;
    private String jongsung;
    private Boolean errorFlag;
    private Boolean emptyJongsung;

    public void setErrorFlag(Boolean errorFlag){
        this.errorFlag = errorFlag;
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

    public void setJongsungEmpty(Boolean JongsungFlag){
        this.emptyJongsung = JongsungFlag;
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
        hashMap.put("word", this.word);
        hashMap.put("chosung", this.chosung);
        hashMap.put("jungsung", this.jungsung);
        if(!this.emptyJongsung){
            hashMap.put("jongsung", this.jongsung);
        }
        return new JSONObject(hashMap);
    }
}

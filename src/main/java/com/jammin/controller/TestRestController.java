package com.jammin.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jammin.util.Hangul;
import com.jammin.util.HangulUtil;

@RestController
public class TestRestController {

    @Autowired
    private HangulUtil hangulUtil;

    @PostMapping("/addWord")
	public String addWord(@RequestBody Map<String,Object> body){
		String requestWord = (String)body.get("requestWord");
		JSONArray jsonArray = new JSONArray();
		if(hangulUtil.isHangul(requestWord)){
			for(Hangul hangul : hangulUtil.hangulSplit(requestWord)){
				jsonArray.put(hangul.toJSON());
			}
		}
		return jsonArray.toString();
	}
}

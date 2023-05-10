package com.jammin.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.json.simple.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jammin.util.Hangul;
import com.jammin.util.HangulUtil;

@RestController
public class TestRestController {

	private static final Logger log = LoggerFactory.getLogger(TestRestController.class);
	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    @Autowired
    private HangulUtil hangulUtil;

    @PostMapping("/addWord")
	public String addWord(@RequestBody Map<String,Object> body){
		log.info("{} >> TestRestController.addWord", dateFormat.format(new Date()));
		String requestWord = (String)body.get("requestWord");
		JSONArray jsonArray = new JSONArray();
		if(hangulUtil.isHangul(requestWord)){
			for(Hangul hangul : hangulUtil.hangulSplit(requestWord)){
				jsonArray.add(hangul.toJSON());
			}
		}
		return jsonArray.toString();
	}
}

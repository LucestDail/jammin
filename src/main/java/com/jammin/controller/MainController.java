package com.jammin.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.ModelAndView;

import com.jammin.util.Hangul;
import com.jammin.util.HangulUtil;

@Controller
public class MainController {

	@Autowired
	private HangulUtil hangulUtil;

    @GetMapping("/")
	public ModelAndView main(Model model) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("index");
		return mav;
	}

	@GetMapping("/test")
	public ModelAndView test(Model model) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("test");
		return mav;
	}

	@GetMapping("/practice")
	public ModelAndView practice(Model model) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("practice");
		return mav;
	}

	@GetMapping("/help")
	public ModelAndView help(Model model) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("help");
		return mav;
	}
}

package com.jammin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MainController {

    @GetMapping("/")
	public ModelAndView test(Model model) {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("main/home");
		return mav;
	}
}

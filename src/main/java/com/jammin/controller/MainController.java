package com.jammin.controller;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class MainController {

	private static final Logger log = LoggerFactory.getLogger(TestRestController.class);
	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    @GetMapping("/")
	public ModelAndView main(Model model) {
		log.info("{} >> MainController.main", dateFormat.format(new Date()));
		ModelAndView mav = new ModelAndView();
		mav.setViewName("index");
		return mav;
	}

	@GetMapping("/test")
	public ModelAndView test(Model model) {
		log.info("{} >> MainController.test", dateFormat.format(new Date()));
		ModelAndView mav = new ModelAndView();
		mav.setViewName("test");
		return mav;
	}

	@GetMapping("/practice")
	public ModelAndView practice(Model model) {
		log.info("{} >> MainController.practice", dateFormat.format(new Date()));
		ModelAndView mav = new ModelAndView();
		mav.setViewName("practice");
		return mav;
	}

	@GetMapping("/help")
	public ModelAndView help(Model model) {
		log.info("{} >> MainController.help", dateFormat.format(new Date()));
		ModelAndView mav = new ModelAndView();
		mav.setViewName("help");
		return mav;
	}

	@GetMapping("/writing")
	public ModelAndView writing(Model model) {
		log.info("{} >> MainController.writing", dateFormat.format(new Date()));
		ModelAndView mav = new ModelAndView();
		mav.setViewName("writing");
		return mav;
	}

	@GetMapping("/paper")
	public ModelAndView paper(Model model) {
		log.info("{} >> MainController.paper", dateFormat.format(new Date()));
		ModelAndView mav = new ModelAndView();
		mav.setViewName("paper");
		return mav;
	}
}

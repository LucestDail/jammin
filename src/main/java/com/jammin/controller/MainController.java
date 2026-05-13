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

	private static void jamminLayout(ModelAndView mav, String navActive, boolean showGuide, String extraCss) {
		mav.addObject("navActive", navActive);
		mav.addObject("showGuide", showGuide);
		mav.addObject("extraCss", extraCss != null ? extraCss : "");
	}

    @GetMapping("/")
	public ModelAndView main(Model model) {
		log.info("{} >> MainController.main", dateFormat.format(new Date()));
		ModelAndView mav = new ModelAndView();
		mav.setViewName("index");
		jamminLayout(mav, "home", false, "");
		return mav;
	}

	@GetMapping("/test")
	public ModelAndView test(Model model) {
		log.info("{} >> MainController.test", dateFormat.format(new Date()));
		ModelAndView mav = new ModelAndView();
		mav.setViewName("test");
		jamminLayout(mav, "test", true, "hangul");
		return mav;
	}

	@GetMapping("/test2")
	public ModelAndView test2(Model model) {
		log.info("{} >> MainController.test2", dateFormat.format(new Date()));
		ModelAndView mav = new ModelAndView();
		mav.setViewName("test2");
		jamminLayout(mav, "test2", true, "hangul");
		return mav;
	}

	@GetMapping("/practice")
	public ModelAndView practice(Model model) {
		log.info("{} >> MainController.practice", dateFormat.format(new Date()));
		ModelAndView mav = new ModelAndView();
		mav.setViewName("practice");
		jamminLayout(mav, "practice", true, "long");
		return mav;
	}

	@GetMapping("/help")
	public ModelAndView help(Model model) {
		log.info("{} >> MainController.help", dateFormat.format(new Date()));
		ModelAndView mav = new ModelAndView();
		mav.setViewName("help");
		jamminLayout(mav, "help", false, "");
		return mav;
	}

	@GetMapping("/writing")
	public ModelAndView writing(Model model) {
		log.info("{} >> MainController.writing", dateFormat.format(new Date()));
		ModelAndView mav = new ModelAndView();
		mav.setViewName("writing");
		jamminLayout(mav, "writing", false, "");
		return mav;
	}

	@GetMapping("/paper")
	public ModelAndView paper(Model model) {
		log.info("{} >> MainController.paper", dateFormat.format(new Date()));
		ModelAndView mav = new ModelAndView();
		mav.setViewName("paper");
		jamminLayout(mav, "paper", true, "");
		return mav;
	}
}

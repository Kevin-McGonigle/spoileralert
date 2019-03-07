# Investigate what types of text is classifier by the Bayesian Classifier

import unittest

from prediction import is_spoiler

class TestClassification(unittest.TestCase):

	def test_spoiler(self):																			# Objective spoiler
		self.assertTrue(is_spoiler("Ned Stark dies"))

	def test_non_spoiler(self):																		# Objective non-spoiler
		self.assertFalse(is_spoiler("Sean Bean plays Ned Stark in Game of Thrones"))

	def test_unrelated_text(self):																	# Unrelated text
		self.assertFalse(is_spoiler("Here's some unrelated text"))									# Should never be passed to server due to regex on front-end

	def test_empty_string(self):																	# Empty String
		self.assertFalse(is_spoiler(""))														

	def test_punctuation(self):																		# Punctuation/abbreviation shouldn't matter
		self.assertTrue(is_spoiler("omg! Ned Stark IS DEAD??!!"))								

	def test_ambiguous(self): 
		self.assertTrue(is_spoiler("Jon Arryn is Warden of the East"))								# Ambiguous text in terms of spoilers (as shown by survey results)

	def test_another_ambiguous(self):																# 50% of survey responses say this is a spoiler
		self.assertFalse(is_spoiler("Ned Stark hires Syrio Forel to teach her to fight"))			# This test is not necessarily written to pass
																									# It is to see what our classifier outputs
if __name__ == "__main__":
	unittest.main()
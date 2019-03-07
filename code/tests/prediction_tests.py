import unittest
import sys


from prediction import is_spoiler

class TestClassification(unittest.TestCase):

	def test_one(self):
		self.assertTrue(is_spoiler("Ned Stark dies"))

	def test_two(self):
		self.assertFalse(is_spoiler("Sean Bean plays Ned Stark in Game of Thrones"))

	

if __name__ == "__main__":
	unittest.main()
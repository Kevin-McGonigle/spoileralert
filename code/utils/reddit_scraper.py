#! python3
# This program was taken from this link, full credit goes to the creater of this repo:
# https://github.com/smidem/reddit_scraper/blob/master/praw_scraper.py
# Running the program on its own produces some false positives/negatives and text contains symbols in the middle of words.

from os.path import isfile
import praw
import pandas as pd
from time import sleep


reddit = praw.Reddit()

class SubredditScraper:

    def __init__(self, sub, sort='new', lim=900, mode='w'):
        self.sub = sub
        self.sort = sort
        self.lim = lim
        self.mode = mode

        print(
            f'SubredditScraper instance created with values '
            f'sub = {sub}, sort = {sort}, lim = {lim}, mode = {mode}')

    def set_sort(self):
        if self.sort == 'new':
            return self.sort, reddit.subreddit(self.sub).new(limit=self.lim)
        elif self.sort == 'top':
            return self.sort, reddit.subreddit(self.sub).top(limit=self.lim)
        elif self.sort == 'hot':
            return self.sort, reddit.subreddit(self.sub).hot(limit=self.lim)
        else:
            self.sort = 'hot'
            print('Sort method was not recognized, defaulting to hot.')
            return self.sort, reddit.subreddit(self.sub).hot(limit=self.lim)

    def get_posts(self):
        """Get unique posts from a specified subreddit."""

        sub_dict = {
            'selftext': [], 'title': [], 'id': []}
        csv = f'new_{self.sub}_posts.csv'

        # Attempt to specify a sorting method.
        sort, subreddit = self.set_sort()

        # Set csv_loaded to True if csv exists since you can't evaluate the
        # truth value of a DataFrame.
        df, csv_loaded = (pd.read_csv(csv), 1) if isfile(csv) else ('', 0)
        csv_loaded = 0

        print(f'csv = {csv}')
        print(f'After set_sort(), sort = {sort} and sub = {self.sub}')
        print(f'csv_loaded = {csv_loaded}')

        print(f'Collecting information from r/{self.sub}.')
        for post in subreddit:

            # Check if post.id is in df and set to True if df is empty.
            # This way new posts are still added to dictionary when df = ''
            unique_id = post.id not in tuple(df.id) if csv_loaded else True

            # Save any unique, non-stickied posts with descriptions to sub_dict.
            if unique_id and post.selftext and (post.title.startswith("[SPOILERS]") or post.title.startswith("[Spoilers]")):
                print(post.selftext)
                sub_dict['selftext'].append(post.selftext)
                sub_dict['title'].append(post.title)
                sub_dict['id'].append(post.id)

        # pprint(sub_dict)
        new_df = pd.DataFrame(sub_dict)

        # Add new_df to df if df exists then save it to a csv.
        if 'DataFrame' in str(type(df)) and self.mode == 'w':
            pd.concat([df, new_df], axis=0, sort=0).to_csv(csv, index=False, encoding="ISO-8859-1")
            print(
                f'{len(new_df)} new posts collected and added to {csv}')
        elif self.mode == 'w':
            new_df.to_csv(csv, index=False)
            print(f'{len(new_df)} posts collected and saved to {csv}')
        else:
            print(
                f'{len(new_df)} posts were collected but they were not '
                f'added to {csv} because mode was set to "{self.mode}"')


if __name__ == '__main__':
    SubredditScraper('gameofthrones', lim=997, mode='w', sort='new').get_posts()

from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from datetime import date
from django.db import connection

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Drop collections directly with PyMongo for a clean state
        try:
            from pymongo import MongoClient
            client = MongoClient('localhost', 27017)
            db = client['octofit_db']
            db.activity.drop()
            db.user.drop()
            db.team.drop()
            db.workout.drop()
            db.leaderboard.drop()
        except Exception as e:
            self.stdout.write(self.style.WARNING(f'Could not drop collections: {e}'))

        # Create teams
        marvel = Team.objects.create(name='Marvel', description='Marvel superheroes')
        dc = Team.objects.create(name='DC', description='DC superheroes')

        # Create users
        tony = User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel)
        steve = User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel)
        bruce = User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team=dc)
        clark = User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc)

        # Create activities
        Activity.objects.create(user=tony, type='Running', duration=30, date=date.today())
        Activity.objects.create(user=steve, type='Cycling', duration=45, date=date.today())
        Activity.objects.create(user=bruce, type='Swimming', duration=60, date=date.today())
        Activity.objects.create(user=clark, type='Yoga', duration=20, date=date.today())

        # Create workouts
        Workout.objects.create(name='Super Strength', description='Strength workout for heroes', suggested_for='All')
        Workout.objects.create(name='Flight Training', description='Aerobic workout for flyers', suggested_for='DC')

        # Create leaderboard
        Leaderboard.objects.create(team=marvel, points=100)
        Leaderboard.objects.create(team=dc, points=90)

        # Ensure unique index on email field for users
        try:
            db.user.create_index([('email', 1)], unique=True)
        except Exception as e:
            self.stdout.write(self.style.WARNING(f'Could not create unique index on user email: {e}'))

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))

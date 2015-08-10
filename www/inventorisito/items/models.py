from django.db import models
from django.contrib.auth.models import User
from allauth.account.models import EmailAddress
from allauth.socialaccount.models import SocialAccount
import hashlib

# Create your models here

#An item that is in the inventory
class Item(models.Model):
  name =  models.CharField(max_length=250, default="")
  unit_price =  models.DecimalField(default = 0.0 , max_digits = 32, decimal_places = 16)
  item_number =  models.CharField(max_length=250, default="")
  order_id =  models.CharField(max_length=250, default="")
  weblink =  models.CharField(max_length=250, default="")
  transaction_id =  models.CharField(max_length=250, default="")
  quantity =  models.IntegerField(default = 0)
  upc_code =  models.CharField(max_length=250, default="")
  image_source =  models.CharField(max_length=250, default="")
  date_of_purchase =  models.DateTimeField('date of purchase')

#The vendor that sold the product
#A vendor, like ebay can have multiple items in the inventory
class Vendor(models.Model):
  name = models.CharField(max_length=250, default="")
  item =  models.ForeignKey(Item)

#The user profile
class UserProfile(models.Model):
  user = models.OneToOneField(User, related_name='profile')
  
  def __unicode__(self):
    return "{}'s profile".format(self.user.username)
  
  class Meta:
    db_table = 'user_profile'

  def account_verified(self):
    if self.user.is_authenticated:
      result = EmailAddress.objects.filter(email=self.user.email)
      if len(result):
        return result[0].verified
      return False

  #returns the fb profile image url if there is one
  def profile_image_url(self):
    fb_uid = SocialAccount.objects.filter(user_id=self.user.id, provider='facebook')
    if len(fb_uid):
      return "http://graph.facebook.com/{}/picture?width=40&height=40".format(fb_uid[0].uid)
    return "http://www.gravatar.com/avatar/{}?s=40".format(hashlib.md5(self.user.email).hexdigest())
User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])

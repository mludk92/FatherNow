import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
      <p>
        Welcome to "Holy $#!T I'm A Dad Now", the quintessential haven for soon-to-be and new fathers stepping
         into the exhilarating realm of fatherhood. As the reality of parenthood beckons, there's a blend of emotions
          surging through. This platform is designed to be your companion through this journey, offering a plethora of
           resources that simplify the complex narrative of being a dad. From enlightening information on child health
            and care to ensuring you are well-equipped with the right baby gear, we're here to ensure your transition
             into fatherhood is as smooth as possible. Our comprehensive reviews and recommendations on baby products
              such as strollers, baby monitors, and much more, are curated to ease your quest in finding the best for your child.
        </p>
        <p>
        But it's not all serious business here; we embrace the lighter and funnier side of fatherhood too!
         Get ready to arm yourself with an endless list of dad jokes bound to earn eye rolls and giggles
          from your family. Every dad has a favorite tune or a go-to movie that defines their journey, and
           at "Holy $#!T I'm A Dad Now", we have a space for you to share and revel in the dad culture.
            Whether it's the classic rock anthems or the iconic dad movies, we celebrate the quirky and 
            fun aspects that make fatherhood an adventure worth every moment.
        </p>
        <p>
        Engage in candid discussions on our chat board, a space carved out for you to share, rant, and discuss
         the myriad experiences of fatherhood. From the comedic recounts of your child's antics to the venting
          space about the ups and downs of parenthood, and yes, the relentless teasing about our partners - it’s
           a community where you can find camaraderie, humor, and support. "Holy $#!T I'm A Dad Now" is more than
            just a website; it's a community where new fathers can find their groove in the magnificent journey of
             dadhood. So, jump in, explore the fatherhood realm with us, and remember, you're not just a dad, you're a cool dad!
        </p>
      </div>
    </div>
  );
}

export default AboutPage;

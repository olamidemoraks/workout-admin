interface Exercise {
  _id: string;
  name: string;
  tips: string;
  body_part: string;
  focus: string;
  equipment: string;
  location: string;
  image: {
    public_id: string;
    url: string;
  };
  female_image: {
    public_id: string;
    url: string;
  };
}

interface Workout {
  _id: string;
  image: {
    public_id: string;
    url: string;
  };
  female_image: {
    public_id: string;
    url: string;
  };
  name: string;
  exercises: Array<any>;
  premium: boolean;
  difficult_level: number;
  estimate_time: number;
  location: string;
}

interface Challenge {
  _id: string;
  title: string;
  days: number;
  premium: boolean;
  image: {
    public_id: string;
    url: string;
  };
  location: string;
  challenges: [];
}

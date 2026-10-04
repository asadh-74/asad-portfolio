window.ENGINEERING_PROJECTS = [
  {
    "id": "fleet",
    "area": "embedded",
    "title": "IoT fleet & driver logging",
    "summary": "An ESP32 device, cellular telemetry, and a dashboard that connect the road to the cloud.",
    "tags": [
      "ESP32",
      "LTE / GPS",
      "MQTT",
      "Flask"
    ],
    "status": "Internship project",
    "description": "Production-grade fleet management system built solo during a full-time internship at RDC/HIT. Integrated an ESP32 (LilyGO T-SIM7670E) with LTE, GPS, RFID driver authentication, and LiPo management into a field-deployable device. Backend on Python Flask + SQL Server with 1 Hz MQTT telemetry, polygon geofencing, harsh-driving detection, and a 10-page Leaflet.js/Chart.js dashboard.",
    "links": [
      {
        "label": "Internship Report",
        "url": "https://www.dropbox.com/scl/fi/q0lw0jxn3ki5r78ncb135/Internship_Report.pdf?rlkey=zkl2ti5sxkxrubfuot5p2jghj&st=hdvbzwi8&dl=0"
      }
    ]
  },
  {
    "id": "semantic",
    "area": "signal",
    "title": "Semantic communication research",
    "summary": "An ongoing final-year project exploring how to communicate useful image information over constrained links.",
    "tags": [
      "MATLAB",
      "Image encoding",
      "FEC"
    ],
    "status": "Ongoing final-year project",
    "description": "Research into semantic image communication, with image-encoder experiments and a planned communication pipeline. DSP and radio integration are future work; the project is not presented as a completed hardware system.",
    "links": []
  },
  {
    "id": "modular",
    "area": "circuits",
    "title": "Modular ESP32 sensor platform",
    "summary": "A main board and sensor board integrating cellular connectivity and I²C sensing.",
    "tags": [
      "EasyEDA",
      "ESP32",
      "I²C",
      "PCB"
    ],
    "status": "PCB design",
    "description": "Designed a modular two-board system built around the ESP32 microcontroller, split into a Main Board and a Sensor Board to optimize performance and reduce electrical noise. The ESP32 handles processing and wireless connectivity, with a GSM module for remote telemetry. The Sensor Board integrates the MAX30102 (pulse/oximetry), MPU6050 (IMU), and MLX90614 (IR temperature sensor) over I2C. Designed end-to-end in EasyEDA, including schematic capture, PCB layout, and 3D rendering.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fi/j4xnr2jkv1xwg0yvn1ors/ESP32_Modular_PCB_Design.pdf?rlkey=k32qoal0ze6ait5rox5vupbxx&st=r1mbeopg&dl=0"
      }
    ]
  },
  {
    "id": "motor",
    "area": "control",
    "title": "Closed-loop motor control",
    "summary": "PID speed control with encoder feedback, from Proteus simulation to Arduino hardware.",
    "tags": [
      "Arduino",
      "PID",
      "Encoder"
    ],
    "status": "Hardware prototype",
    "description": "Closed-loop DC motor speed controller using an optical rotary encoder for feedback and an L298N H-bridge driver. Manually tuned PID gains to minimize overshoot and settling time while staying robust to load disturbances. Simulated in Proteus first, then deployed on Arduino hardware.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fi/oj6eahtnjuozzz1znib6u/DC_Motor_Speed_Control_Report.pdf?rlkey=3z9q9rs8k067zwlr8r6l9wht5&st=ku5dou0e&dl=0"
      }
    ]
  },
  {
    "id": "rf",
    "area": "signal",
    "title": "DroneGuard RF intelligence",
    "summary": "An RF detection and signal-classification study connecting spectrum analysis with software.",
    "tags": [
      "SDR",
      "GNU Radio",
      "Signal analysis"
    ],
    "status": "Research prototype",
    "description": "An exploration of RF detection, spectrum visualization, and drone-related signal classification. This portfolio presents the sensing and analysis work. No detection range or classification-accuracy result is claimed here.",
    "links": []
  },
  {
    "id": "eeg",
    "area": "signal",
    "title": "EEG signal processing",
    "summary": "A MATLAB workflow for cleaning noisy EEG signals and exploring filters in a real-time simulation.",
    "tags": [
      "MATLAB",
      "DSP",
      "Filters"
    ],
    "status": "Educational simulation",
    "description": "Cleaned raw EEG recordings from a Parkinson's patient in MATLAB, removing 50 Hz powerline interference, EMG artifacts, eye-blink transients, and baseline drift using a cascade of notch, high-pass, and low-pass filters. Built an interactive MATLAB App Designer GUI to toggle each filter stage and visualize results in real time.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fi/6hx2yv3uql3tqn553inqf/Cleaning-and-Real-Time-Simulation-of-EEG-Data.pdf?rlkey=fb5i671717jlwb03cafwjh63a&st=nqs2l1k0&dl=0"
      }
    ]
  },
  {
    "id": "meter",
    "area": "embedded",
    "title": "Connected energy meter",
    "summary": "An ESP32 smart-meter simulation exploring energy monitoring and IoT connectivity.",
    "tags": [
      "ESP32",
      "Proteus",
      "AMI"
    ],
    "status": "Simulation · hardware planned",
    "description": "Advanced Metering Infrastructure style smart energy meter built around an ESP32, simulated in Proteus before hardware-prototype planning. Paired with a full-stack web dashboard for live energy-consumption monitoring, from raw sensor readings to a utility-facing view.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fo/su5peq6dn6a7oh3084ffy/AKwRIv6NDVJscuOgnZBcA4o?rlkey=ubwwjfj3i1cn1nmw9s15z2jrr&st=8sln4fnc&dl=0"
      }
    ]
  },
  {
    "id": "battery",
    "area": "circuits",
    "title": "EV battery management research",
    "summary": "Ongoing work on battery-management circuitry and range-estimation methods.",
    "tags": [
      "BMS",
      "Battery systems",
      "Research"
    ],
    "status": "Ongoing research",
    "description": "Ongoing work on battery-management circuitry and range-estimation methods.",
    "links": [
      {
        "label": "Open Folder",
        "url": "https://www.dropbox.com/scl/fo/hvj4ffpm0tt7ajwmrw062/ANvcKKu_ysNoFXvfMJ316Us?rlkey=agls0jkaluu9ilg2xnxxo2hhp&st=2uyog8dd&dl=0"
      }
    ]
  },
  {
    "id": "lowpass",
    "area": "circuits",
    "title": "Butterworth low-pass filter",
    "summary": "From a simulated frequency response to an op-amp circuit built and tested on the bench.",
    "tags": [
      "Analog",
      "Op-amps",
      "Hardware testing"
    ],
    "status": "Built & tested",
    "description": "Designed a 2nd-order Butterworth active low-pass filter using op-amps and RC components. Achieves greater than 10 dB attenuation at 11.25 kHz with a flat 20 dB passband gain up to 900 Hz. Simulated first, then built and tested on hardware with results matching the simulated Bode plot.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fi/ol4xlrt98yu4w4d2hsvmt/2nd-Order-Active-Low-Pass-Filter-Circuit.pdf?rlkey=rqrad9itltqiz61qld3xe0jr1&st=u9cr2rea&dl=0"
      }
    ]
  },
  {
    "id": "amplifier",
    "area": "circuits",
    "title": "Audio power amplifier",
    "summary": "A practical exploration of analog amplification, biasing, and circuit performance.",
    "tags": [
      "Analog",
      "Amplification"
    ],
    "status": "Academic project",
    "description": "Multi-stage audio amplifier chain covering preamplification, driver stage, and power output for high-fidelity reproduction across the full audible spectrum. Component values and biasing tuned to keep THD within acceptable limits, validated first in simulation then on physical hardware.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fi/bebit4tgfwg7xhxbcvwi0/Audio-Power-Amplifier.pdf?rlkey=njovujnizm7q3oj6d2qwkyl6a&st=x6vvh80x&dl=0"
      }
    ]
  },
  {
    "id": "equalizer",
    "area": "signal",
    "title": "Five-band graphic equalizer",
    "summary": "An interactive MATLAB and Simulink system for shaping audio across five frequency bands.",
    "tags": [
      "MATLAB",
      "Simulink",
      "Audio DSP"
    ],
    "status": "Simulation",
    "description": "5-band graphic equalizer using Butterworth bandpass filters centred at standard ISO frequencies from 63 Hz to 16 kHz. Developed a Q-sweep algorithm so the combined response stays flat when all sliders are centred. Full MATLAB GUI with live playback and +/-12 dB sliders, validated against a Simulink model.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fi/wwl0ls6ccdfrll1af7x5t/Design-Implementation-of-a-5-Band-Graphic-Equalizer-using-MATLAB-Simulink-GUI.pdf?rlkey=uke6ropunivtlelra6f25qp6w&st=74gnbib4&dl=0"
      }
    ]
  },
  {
    "id": "alu",
    "area": "control",
    "title": "Four-bit arithmetic logic unit",
    "summary": "A digital logic design that implements arithmetic and logical operations with discrete components.",
    "tags": [
      "Digital logic",
      "Combinational circuits"
    ],
    "status": "Academic project",
    "description": "4-bit ALU built entirely from discrete logic gates, supporting ADD, SUB, AND, OR, XOR, and NOT selected via a function-select input, mirroring the core compute unit inside a processor. Verified functional correctness across all 256 possible input combinations.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fi/e2llyojqd6vcdsjl7dn77/Design-a-4-bit-Arithmetic-Logic-Unit-ALU.pdf?rlkey=5kte4qj4xz3pca5t44q63cyzq&st=jpwrm9zm&dl=0"
      }
    ]
  },
  {
    "id": "fm",
    "area": "signal",
    "title": "FM radio receiver",
    "summary": "An analog receiver built around the TDA7000, exploring tuning and audio recovery.",
    "tags": [
      "RF",
      "TDA7000",
      "Analog"
    ],
    "status": "Academic project",
    "description": "FM receiver built around the TDA7000 single-chip IC, covering front-end tuning circuit component selection, local oscillator calculations, and full block-level system design from antenna to audio output. Verified demodulation in MATLAB/Simulink before building and testing the physical circuit.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fi/skltocjxb8qv162f3js3p/FM_Receiver_Complete.pdf?rlkey=d5sgfft22gz1lj4pqc7yn2s8q&st=lp1mgay0&dl=0"
      }
    ]
  },
  {
    "id": "budget",
    "area": "software",
    "title": "C++ budget planner",
    "summary": "A command-line application for organizing income, expenses, and monthly budgets.",
    "tags": [
      "C++",
      "Software"
    ],
    "status": "Software project",
    "description": "Command-line budget planning tool in C++ tracking expenses across user-defined categories over custom durations, calculating per-category savings/overspending, and generating personalized recommendations. Uses file handling for persistent storage and pointer-based data structures for category lists.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fi/mvvrpeys8i9cuqu1wvqx9/Monthly-Budget-Planner.pdf?rlkey=1k5f4lsquwc2izx23tv65y6ux&st=p64uz5eh&dl=0"
      }
    ]
  },
  {
    "id": "voltmeter",
    "area": "embedded",
    "title": "Multi-range digital voltmeter",
    "summary": "ADC-based voltage measurement with range selection and a digital display.",
    "tags": [
      "Arduino",
      "ADC",
      "Instrumentation"
    ],
    "status": "Academic project",
    "description": "3-range (2V/4V/5V) digital voltmeter using the Arduino UNO's built-in ADC with an analog multiplexer for automatic range switching. Displays values live on a 16x2 LCD with an automatic over-range alert. Demonstrates sensor interfacing, ADC calibration, and embedded measurement-system design.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fi/2y9lfqaekvy1fkkml63l4/Multirange-Voltmeter.pdf?rlkey=kk45x9zhd95bxzhdmslyudc4j&st=ui38gt3h&dl=0"
      }
    ]
  },
  {
    "id": "cart",
    "area": "software",
    "title": "Object-oriented shopping cart",
    "summary": "A C++ application exploring classes, state, and shopping-cart operations.",
    "tags": [
      "C++",
      "OOP"
    ],
    "status": "Software project",
    "description": "Full object-oriented shopping system in C++ covering product browsing, cart management, discount application, and checkout. Class hierarchy of Products, Employees, and Shop demonstrates encapsulation, inheritance, and polymorphism with a clean separation between data models and business logic.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fi/ln979gckqxhavttvdqufl/Shopping-Cart-System.pdf?rlkey=rs5legijhk6g7vcbr8dtj4h4x&st=hrprrfmc&dl=0"
      }
    ]
  },
  {
    "id": "water",
    "area": "embedded",
    "title": "Water level indicator",
    "summary": "A microcontroller project for sensing water level and presenting its state.",
    "tags": [
      "Microcontrollers",
      "Sensors",
      "Proteus"
    ],
    "status": "Academic project",
    "description": "4-state water level indicator (Low/Medium/High/Full) designed and simulated in Proteus using an ATmega16 microcontroller. Sensor inputs drive a bank of status LEDs and a live display, with debounced logic to avoid flickering between adjacent states.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fi/ogldovruy8snay9bzvm1a/Water-Level-Indicator-Using-Arduino.pdf?rlkey=4y9orz8gx53cryxxpevdns1hn&st=hpk31ent&dl=0"
      }
    ]
  },
  {
    "id": "parking",
    "area": "embedded",
    "title": "Smart parking system",
    "summary": "A Proteus simulation of sensor-based parking detection and availability indication.",
    "tags": [
      "Proteus",
      "Sensors"
    ],
    "status": "Simulation",
    "description": "Smart parking occupancy system simulated in Proteus using IR sensors to detect whether each slot is occupied. Microcontroller logic aggregates sensor states in real time and displays live slot-availability data on an LCD.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fi/q240nylfrevn4voxulk57/Smart_Parking_Report.pdf?rlkey=tamifoiycuebwhwk2z4unfn41&st=zkm6noxh&dl=0"
      }
    ]
  },
  {
    "id": "rfid",
    "area": "embedded",
    "title": "RFID access control",
    "summary": "An Arduino and MFRC522 simulation exploring SPI-based identification and access logic.",
    "tags": [
      "Arduino",
      "RFID",
      "SPI"
    ],
    "status": "Simulation",
    "description": "Full RFID-based access control system in Proteus ISIS using an Arduino UNO and MFRC522 reader over SPI. Authorized UIDs unlock the door via a servo-driven latch; unauthorized attempts trigger a buzzer alert. All five defined test cases passed during simulation.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fi/x9k0zl4rmljz8ly9ipyi5/RFID_Door_Lock_Report.pdf?rlkey=z18547025vhfwy3cglfub62ph&st=f9hyx6ok&dl=0"
      }
    ]
  },
  {
    "id": "solar",
    "area": "control",
    "title": "Dual-axis solar tracker",
    "summary": "A simulated tracking system using light sensors and servo positioning.",
    "tags": [
      "Proteus",
      "LDR",
      "Servo control"
    ],
    "status": "Simulation",
    "description": "Dual-axis solar tracking system in Proteus using LDR-based differential light sensing to determine the direction of strongest sunlight. Two servo motors adjust azimuth and elevation in a closed feedback loop to maximize irradiance capture throughout the day.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fi/ufrcoqswzpvy8kkcivga6/Solar_Tracker_Report_NUST.pdf?rlkey=yrx069pz3dawg8t3avgeq53yp&st=br1bu102&dl=0"
      }
    ]
  },
  {
    "id": "bluetooth",
    "area": "embedded",
    "title": "Bluetooth-controlled car",
    "summary": "Wireless commands translated into motor control through an HC-05 and motor driver.",
    "tags": [
      "Bluetooth",
      "HC-05",
      "Motor control"
    ],
    "status": "Academic project",
    "description": "Bluetooth-controlled car built from the ground up around a PIC18F877A, covering circuit simulation, firmware, and hardware assembly. An HC-05/06 module receives movement commands and passes them to the microcontroller, which drives an L293D H-bridge. Simulated in Proteus, then hand-soldered onto a chassis.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fi/ogamptd1m5ou7n5p9vcye/Bluetooth_Controlled_Car.pdf?rlkey=zfe0u6027w506y0jncb3vblji&st=24u42t0p&dl=0"
      }
    ]
  },
  {
    "id": "supply",
    "area": "circuits",
    "title": "Custom DC power supply",
    "summary": "A circuit design project exploring power conversion and regulated DC output.",
    "tags": [
      "Power electronics",
      "Circuit design"
    ],
    "status": "Academic project",
    "description": "Benchtop-style DC power supply built entirely from discrete components, covering the full power conversion chain from AC mains through step-down, rectification, and regulation. Heatsinked regulation stage housed in a protective enclosure with labeled output terminals for practical bench use.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fi/wdx4qvvqa7gt23cmw4rmf/Custom_DC_Power_Supply.pdf?rlkey=mu7h4un3mcrlltijyu1dy43mt&st=0c2faa3s&dl=0"
      }
    ]
  },
  {
    "id": "vision",
    "area": "software",
    "title": "Real-time object detection",
    "summary": "A YOLOv8 dashboard that brings computer vision into an interactive Streamlit application.",
    "tags": [
      "YOLOv8",
      "Streamlit",
      "Docker"
    ],
    "status": "Software prototype",
    "description": "Real-time object detection system built on YOLOv8 (yolov8n and yolov8m weights), wrapped in an interactive Streamlit dashboard for live video upload, annotated playback, and detection logging. Packaged with Docker Compose for one-command deployment. Built and demoed for NUST Robotics Society's Voltfest 2026.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fi/90p47sqej50zhw2o44gzb/Object-Detection.zip?rlkey=ybzgymgpzz2xg5te3ho4ppncm&st=ncgs8ul5&dl=0"
      }
    ]
  },
  {
    "id": "credit",
    "area": "software",
    "title": "Credit risk classification",
    "summary": "A machine learning classification project completed during the CodeAlpha internship.",
    "tags": [
      "Python",
      "Classification",
      "Scikit-learn"
    ],
    "status": "Internship project",
    "description": "Credit-scoring classification model built during the CodeAlpha internship, comparing Logistic Regression, Decision Trees, and Random Forest on applicant financial-history data. Features engineered from raw records; models evaluated with Precision, Recall, F1-score, and ROC-AUC.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fo/yvfjam9937yfipvivkwqb/ALSeyCSaPXcaRWa4bYflzRc?rlkey=8rdyatiyliyohyner2r0cxu8n&st=x8d8csue&dl=0"
      }
    ]
  },
  {
    "id": "digits",
    "area": "software",
    "title": "Handwritten character recognition",
    "summary": "A convolutional neural network project for recognizing handwritten characters.",
    "tags": [
      "Python",
      "CNN",
      "MNIST / EMNIST"
    ],
    "status": "Internship project",
    "description": "Convolutional Neural Network for handwritten character recognition trained on MNIST/EMNIST, built during the CodeAlpha internship. Covers the full pipeline: image preprocessing, data augmentation, model architecture design, training, and accuracy evaluation on held-out test characters.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fo/yvfjam9937yfipvivkwqb/ALSeyCSaPXcaRWa4bYflzRc?rlkey=8rdyatiyliyohyner2r0cxu8n&st=x8d8csue&dl=0"
      }
    ]
  },
  {
    "id": "disease",
    "area": "software",
    "title": "Disease classification study",
    "summary": "An educational machine learning experiment using health-related tabular data.",
    "tags": [
      "Python",
      "Classification"
    ],
    "status": "Educational project",
    "description": "Disease-prediction classifier on structured medical data (symptoms, age, lab results) built during the CodeAlpha internship. Compared SVM, Logistic Regression, and Random Forest to identify the model that best separated at-risk patients from healthy ones. This is an educational project, not a clinical diagnostic tool.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fo/yvfjam9937yfipvivkwqb/ALSeyCSaPXcaRWa4bYflzRc?rlkey=8rdyatiyliyohyner2r0cxu8n&st=x8d8csue&dl=0"
      }
    ]
  },
  {
    "id": "flyrank",
    "area": "software",
    "title": "Backend AI engineering",
    "summary": "API development, retrieval workflows, containerization, and an LLM usage-metering capstone.",
    "tags": [
      "APIs",
      "Docker",
      "Python"
    ],
    "status": "Internship project",
    "description": "API development, retrieval workflows, containerization, and an LLM usage-metering capstone.",
    "links": []
  },
  {
    "id": "cad",
    "area": "circuits",
    "title": "Mechanical CAD studies",
    "summary": "A collection of mechanical design studies; detailed documentation is being prepared.",
    "tags": [
      "CAD",
      "Design studies"
    ],
    "status": "Documentation in progress",
    "description": "A collection of mechanical design studies; detailed documentation is being prepared.",
    "links": [
      {
        "label": "Open Folder",
        "url": "https://www.dropbox.com/scl/fo/3qg93wc9ybyu43en55p3a/AP-lAp8sHOoqOx-jCB45V2Q?rlkey=2sla5plh98uabir1k83k8b8ow&st=y4m7h4b5&dl=0"
      }
    ]
  },
  {
    "id": "usb",
    "area": "circuits",
    "title": "ESP32 USB interface PCB",
    "summary": "A PCB design study connecting the ESP32 to a USB interface in Altium Designer.",
    "tags": [
      "ESP32",
      "Altium",
      "PCB"
    ],
    "status": "Design study",
    "description": "A PCB design study connecting the ESP32 to a USB interface in Altium Designer.",
    "links": [
      {
        "label": "Open Folder",
        "url": "https://www.dropbox.com/scl/fo/e95es49uj5723a2wpqj7a/AFeL0fY2mubWfaJBMenyxGs?rlkey=9dpk5oamcxiaqwio048bjfzb5&st=9urm7dph&dl=0"
      }
    ]
  },
  {
    "id": "charging",
    "area": "circuits",
    "title": "EV charging circuit concept",
    "summary": "An early-stage exploration of charging circuits and power-stage design.",
    "tags": [
      "Power electronics",
      "EV systems"
    ],
    "status": "Concept",
    "description": "An early-stage exploration of charging circuits and power-stage design.",
    "links": [
      {
        "label": "Open Folder",
        "url": "https://www.dropbox.com/scl/fo/5buywrdohizg5zao5gjbj/APiKHJW1HATQyIewKocYgGE?rlkey=0w3oqkzhdoojwthn1rl22izeg&st=tvn59slj&dl=0"
      }
    ]
  },
  {
    "id": "relay",
    "area": "circuits",
    "title": "Relay control PCB",
    "summary": "A board-design study for switching loads through a relay interface.",
    "tags": [
      "PCB",
      "Relays"
    ],
    "status": "Design study",
    "description": "A board-design study for switching loads through a relay interface.",
    "links": [
      {
        "label": "Open Folder",
        "url": "https://www.dropbox.com/scl/fo/kxqcuuodj17zjlus8w3ow/AF-qeZLqEk0TFXm6Y442j1A?rlkey=t0nf00x1355rsrpiksbunz4kv&st=6790rhhl&dl=0"
      }
    ]
  },
  {
    "id": "drone",
    "area": "control",
    "title": "Autonomous drone fleet simulator",
    "summary": "A software simulation for exploring coordinated drone behavior and fleet management.",
    "tags": [
      "Simulation",
      "Control",
      "Python"
    ],
    "status": "Simulation",
    "description": "A simulation environment modeling a fleet of autonomous drones operating together, covering coordination logic, flight behavior, and fleet-level system dynamics.",
    "links": [
      {
        "label": "View Report",
        "url": "https://www.dropbox.com/scl/fi/266cxkquxk2kxkuj49mnc/Autonomous-Drone-Fleet-Simulator.pdf?rlkey=a0j8z0tl164ly22ty80u7xya1&st=fftaemo6&dl=0"
      }
    ]
  }
];
window.ENGINEERING_CERTIFICATES = [
  {
    "id": "flyrank-backend-ai",
    "title": "Backend AI Engineering Internship",
    "org": "FlyRank AI",
    "date": "1 Jul 2026 – 7 Sep 2026",
    "credentialId": "FR-D11-EBC4A-72E6F",
    "icon": "fa-server",
    "imageUrl": "certs/flyrank-backend-ai-cert.jpg",
    "verifyUrl": "https://internship.flyrank.ai/verify",
    "category": "internship"
  },
  {
    "id": "nepra-internship",
    "title": "Technical Intern, Technical Department",
    "org": "National Electric Power Regulatory Authority (NEPRA)",
    "date": "6 Jul 2026 – 17 Aug 2026",
    "credentialId": "Ref No: MON-08/2026/40",
    "icon": "fa-bolt",
    "imageUrl": "certs/nepra-internship.jpg?v=20260918",
    "verifyUrl": "",
    "category": "internship",
    "issueDate": "18 September 2026"
  },
  {
    "id": "codealpha-ml",
    "title": "Machine Learning Internship",
    "org": "CodeAlpha",
    "date": "20 Jun 2026 – 20 Jul 2026",
    "credentialId": "CA/DF1/160558",
    "icon": "fa-brain",
    "imageUrl": "certs/codealpha-ml.jpg",
    "verifyUrl": "",
    "category": "internship"
  },
  {
    "id": "hit-internship",
    "title": "Engineering Internship — IoT Driver Logging System",
    "org": "Heavy Industries Taxila (HIT), Technical Directorate",
    "date": "7 Jul 2025 – 13 Aug 2025",
    "credentialId": "HIT Internship Certificate",
    "icon": "fa-microchip",
    "imageUrl": "certs/hit-internship.png",
    "documentUrl": "certs/HIT Internship Certificate.pdf",
    "verifyUrl": "",
    "category": "internship"
  },
  {
    "id": "rdc-internship",
    "title": "Internship — Designing & Testing of Driver Logging Device",
    "org": "Research & Indigenous Development Centre (RDC), Heavy Industries Taxilla",
    "date": "24 Jun 2025 – 08 Aug 2025",
    "credentialId": "RDC Internship Certificate",
    "icon": "fa-flask",
    "imageUrl": "certs/rdc-internship.jpg",
    "verifyUrl": "",
    "category": "internship"
  },
  {
    "id": "ncra-internship",
    "title": "Internship — Embedded Systems, IoT & Communication (RDDL)",
    "org": "National Centre of Robotics and Automation (NCRA), NUST",
    "date": "15 Jul 2024 – 26 Aug 2024",
    "credentialId": "NCRA Internship Certificate",
    "icon": "fa-robot",
    "imageUrl": "certs/ncra-internship.jpg",
    "verifyUrl": "",
    "category": "internship"
  },
  {
    "id": "altium-pcb",
    "title": "PCB Basic Design Course",
    "org": "Altium Education",
    "date": "August 2026",
    "credentialId": "cert_lypgb5lw",
    "icon": "fa-microchip",
    "imageUrl": "certs/altium-pcb.jpg",
    "verifyUrl": ""
  },
  {
    "id": "harvard-cs50x",
    "title": "CS50 Introduction to Computer Science",
    "org": "Harvard University",
    "date": "2026",
    "credentialId": "20f627af-99e6-4f7b-ac0c-ce19076f2aac",
    "icon": "fa-graduation-cap",
    "imageUrl": "certs/harvard-cs50x.jpg",
    "verifyUrl": "https://cs50.harvard.edu/certificates/20f627af-99e6-4f7b-ac0c-ce19076f2aac"
  },
  {
    "id": "ibm-data-analysis-python",
    "title": "Data Analysis with Python (DA0101EN)",
    "org": "IBM (issued by Etrain Education)",
    "date": "April 2024",
    "credentialId": "e5a16f1adc3b42c6bb428a2d631b3337",
    "icon": "fa-chart-line",
    "imageUrl": "certs/ibm-data-analysis.jpg",
    "verifyUrl": "https://courses.etrain.skillsnetwork.site/certificates/e5a16f1adc3b42c6bb428a2d631b3337"
  },
  {
    "id": "deloitte-leadership",
    "title": "Effective Leadership — Scored 90%",
    "org": "Deloitte WorldClass",
    "date": "August 2026",
    "credentialId": "Deloitte WorldClass Certificate",
    "icon": "fa-users",
    "imageUrl": "certs/deloitte-leadership.jpg",
    "verifyUrl": ""
  },
  {
    "id": "alison-product-mgmt",
    "title": "Digital Product Management",
    "org": "Alison",
    "date": "2024",
    "credentialId": "Alison Certificate",
    "icon": "fa-cube",
    "imageUrl": "certs/alison-product-mgmt.jpg",
    "verifyUrl": "https://alison.com/certificates/007896"
  }
];

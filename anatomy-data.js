// Anatomy data structure with connections for different difficulty levels
// Scientific medical terminology for medical students

const anatomyData = {
    bones: {
        name: "עצמות",
        difficulty: "קל",
        structures: {
            "גולגולת (Cranium)": ["חוליה צווארית C1", "לסת תחתונה (Mandibula)"],
            "חוליה צווארית C1": ["גולגולת (Cranium)", "חוליה צווארית C7", "עצם הבריח (Clavicula)"],
            "חוליה צווארית C7": ["חוליה צווארית C1", "חוליה חזית T1"],
            "חוליה חזית T1": ["חוליה צווארית C7", "חוליה חזית T12", "צלע 1"],
            "חוליה חזית T12": ["חוליה חזית T1", "חוליה מותנית L1"],
            "חוליה מותנית L1": ["חוליה חזית T12", "חוליה מותנית L5"],
            "חוליה מותנית L5": ["חוליה מותנית L1", "עצם העצה (Sacrum)"],
            "עצם העצה (Sacrum)": ["חוליה מותנית L5", "עצם הכסל (Ilium)"],
            "עצם הכסל (Ilium)": ["עצם העצה (Sacrum)", "עצם הירך (Femur)"],
            "עצם הירך (Femur)": ["עצם הכסל (Ilium)", "פיקה (Patella)", "שוקה (Tibia)"],
            "שוקה (Tibia)": ["עצם הירך (Femur)", "פיקה (Patella)", "עצם הקרסול (Talus)"],
            "פיקה (Patella)": ["עצם הירך (Femur)", "שוקה (Tibia)"],
            "עצם הקרסול (Talus)": ["שוקה (Tibia)", "עצמות כף הרגל (Metatarsals)"],
            "עצמות כף הרגל (Metatarsals)": ["עצם הקרסול (Talus)"],
            "צלע 1": ["חוליה חזית T1", "עצם החזה (Sternum)"],
            "צלע 7": ["חוליה חזית T7", "עצם החזה (Sternum)"],
            "עצם החזה (Sternum)": ["צלע 1", "צלע 7", "עצם הבריח (Clavicula)"],
            "עצם הבריח (Clavicula)": ["עצם החזה (Sternum)", "חוליה צווארית C1", "עצם השכם (Scapula)"],
            "עצם השכם (Scapula)": ["עצם הבריח (Clavicula)", "עצם הזרוע (Humerus)"],
            "עצם הזרוע (Humerus)": ["עצם השכם (Scapula)", "עצם המרפק (Ulna)", "עצם החישור (Radius)"],
            "עצם המרפק (Ulna)": ["עצם הזרוע (Humerus)", "עצמות שורש כף היד (Carpals)"],
            "עצם החישור (Radius)": ["עצם הזרוע (Humerus)", "עצמות שורש כף היד (Carpals)"],
            "עצמות שורש כף היד (Carpals)": ["עצם המרפק (Ulna)", "עצם החישור (Radius)", "עצמות כף היד (Metacarpals)"],
            "עצמות כף היד (Metacarpals)": ["עצמות שורש כף היד (Carpals)"],
            "לסת תחתונה (Mandibula)": ["גולגולת (Cranium)"]
        }
    },
    
    organs: {
        name: "איברים",
        difficulty: "קל",
        structures: {
            "מוח (Cerebrum)": ["גזע המוח (Brainstem)", "עצב הראייה (Optic Nerve)"],
            "גזע המוח (Brainstem)": ["מוח (Cerebrum)", "חוט השדרה (Spinal Cord)"],
            "חוט השדרה (Spinal Cord)": ["גזע המוח (Brainstem)", "לב (Heart)", "ריאות (Lungs)"],
            "לב (Heart)": ["חוט השדרה (Spinal Cord)", "ריאות (Lungs)", "כבד (Liver)", "כליות (Kidneys)"],
            "ריאה ימנית (Right Lung)": ["חוט השדרה (Spinal Cord)", "לב (Heart)", "קנה הנשימה (Trachea)"],
            "ריאה שמאלית (Left Lung)": ["חוט השדרה (Spinal Cord)", "לב (Heart)", "קנה הנשימה (Trachea)"],
            "קנה הנשימה (Trachea)": ["ריאה ימנית (Right Lung)", "ריאה שמאלית (Left Lung)", "גרון (Larynx)"],
            "גרון (Larynx)": ["קנה הנשימה (Trachea)", "ושט (Esophagus)"],
            "ושט (Esophagus)": ["גרון (Larynx)", "קיבה (Stomach)"],
            "קיבה (Stomach)": ["ושט (Esophagus)", "כבד (Liver)", "לבלב (Pancreas)", "תריסריון (Duodenum)"],
            "כבד (Liver)": ["קיבה (Stomach)", "לב (Heart)", "כיס המרה (Gallbladder)"],
            "כיס המרה (Gallbladder)": ["כבד (Liver)", "לבלב (Pancreas)"],
            "לבלב (Pancreas)": ["קיבה (Stomach)", "כיס המרה (Gallbladder)", "תריסריון (Duodenum)"],
            "תריסריון (Duodenum)": ["קיבה (Stomach)", "לבלב (Pancreas)", "מעי דק (Small Intestine)"],
            "מעי דק (Small Intestine)": ["תריסריון (Duodenum)", "מעי גס (Large Intestine)"],
            "מעי גס (Large Intestine)": ["מעי דק (Small Intestine)", "רקטום (Rectum)"],
            "רקטום (Rectum)": ["מעי גס (Large Intestine)"],
            "כליה ימנית (Right Kidney)": ["לב (Heart)", "שלפוחית השתן (Urinary Bladder)"],
            "כליה שמאלית (Left Kidney)": ["לב (Heart)", "שלפוחית השתן (Urinary Bladder)"],
            "שלפוחית השתן (Urinary Bladder)": ["כליה ימנית (Right Kidney)", "כליה שמאלית (Left Kidney)", "שופכה (Urethra)"],
            "שופכה (Urethra)": ["שלפוחית השתן (Urinary Bladder)"],
            "עצב הראייה (Optic Nerve)": ["מוח (Cerebrum)"]
        }
    },
    
    muscles: {
        name: "שרירים",
        difficulty: "בינוני",
        structures: {
            "שרירי הצוואר (Cervical Muscles)": ["שריר הטרפז (Trapezius)", "שרירי הגב העליון (Upper Back Muscles)"],
            "שריר הטרפז (Trapezius)": ["שרירי הצוואר (Cervical Muscles)", "שרירי החזה (Pectoral Muscles)", "שריר הדלתא (Deltoid)"],
            "שרירי הגב העליון (Upper Back Muscles)": ["שרירי הצוואר (Cervical Muscles)", "שרירי הגב התחתון (Lower Back Muscles)", "שריר הטרפז (Trapezius)"],
            "שרירי החזה (Pectoral Muscles)": ["שריר הטרפז (Trapezius)", "שרירי הבטן (Abdominal Muscles)", "שריר הדלתא (Deltoid)"],
            "שרירי הגב התחתון (Lower Back Muscles)": ["שרירי הגב העליון (Upper Back Muscles)", "שרירי הבטן (Abdominal Muscles)", "שרירי האגן (Pelvic Muscles)"],
            "שרירי הבטן (Abdominal Muscles)": ["שרירי החזה (Pectoral Muscles)", "שרירי הגב התחתון (Lower Back Muscles)", "שרירי האגן (Pelvic Muscles)"],
            "שרירי האגן (Pelvic Muscles)": ["שרירי הגב התחתון (Lower Back Muscles)", "שרירי הבטן (Abdominal Muscles)", "שרירי הירך (Thigh Muscles)"],
            "שריר הדלתא (Deltoid)": ["שריר הטרפז (Trapezius)", "שרירי החזה (Pectoral Muscles)", "שריר הזרוע (Biceps)", "שריר הזרוע התלת ראשי (Triceps)"],
            "שריר הזרוע (Biceps)": ["שריר הדלתא (Deltoid)", "שרירי החזה (Pectoral Muscles)", "שרירי האמה (Forearm Muscles)"],
            "שריר הזרוע התלת ראשי (Triceps)": ["שריר הדלתא (Deltoid)", "שרירי האמה (Forearm Muscles)"],
            "שרירי האמה (Forearm Muscles)": ["שריר הזרוע (Biceps)", "שריר הזרוע התלת ראשי (Triceps)", "שרירי כף היד (Hand Muscles)"],
            "שרירי כף היד (Hand Muscles)": ["שרירי האמה (Forearm Muscles)"],
            "שרירי הירך (Thigh Muscles)": ["שרירי האגן (Pelvic Muscles)", "שרירי השוק (Leg Muscles)"],
            "שרירי השוק (Leg Muscles)": ["שרירי הירך (Thigh Muscles)", "שרירי כף הרגל (Foot Muscles)"],
            "שרירי כף הרגל (Foot Muscles)": ["שרירי השוק (Leg Muscles)"]
        }
    },
    
    vessels: {
        name: "כלי דם",
        difficulty: "קשה",
        structures: {
            "עורק הראש (Common Carotid Artery)": ["עורק התרדמה הפנימי (Internal Carotid Artery)", "עורק התרדמה החיצוני (External Carotid Artery)"],
            "עורק התרדמה הפנימי (Internal Carotid Artery)": ["עורק הראש (Common Carotid Artery)", "עורק המוח (Cerebral Artery)"],
            "עורק התרדמה החיצוני (External Carotid Artery)": ["עורק הראש (Common Carotid Artery)"],
            "עורק המוח (Cerebral Artery)": ["עורק התרדמה הפנימי (Internal Carotid Artery)"],
            "עורק הלב הראשי (Aorta)": ["חדר שמאל (Left Ventricle)", "עורק הריאה (Pulmonary Artery)", "עורק הכבד (Hepatic Artery)", "עורק הכליה (Renal Artery)"],
            "חדר שמאל (Left Ventricle)": ["עורק הלב הראשי (Aorta)"],
            "עורק הריאה (Pulmonary Artery)": ["חדר ימין (Right Ventricle)", "וריד הריאה (Pulmonary Vein)"],
            "חדר ימין (Right Ventricle)": ["עורק הריאה (Pulmonary Artery)"],
            "וריד הריאה (Pulmonary Vein)": ["עורק הריאה (Pulmonary Artery)", "פרוזדור שמאל (Left Atrium)"],
            "פרוזדור שמאל (Left Atrium)": ["וריד הריאה (Pulmonary Vein)", "חדר שמאל (Left Ventricle)"],
            "וריד הראש (Superior Vena Cava)": ["פרוזדור ימין (Right Atrium)"],
            "וריד הבטן (Inferior Vena Cava)": ["פרוזדור ימין (Right Atrium)"],
            "פרוזדור ימין (Right Atrium)": ["וריד הראש (Superior Vena Cava)", "וריד הבטן (Inferior Vena Cava)", "חדר ימין (Right Ventricle)"],
            "עורק הכבד (Hepatic Artery)": ["עורק הלב הראשי (Aorta)", "כבד (Liver)"],
            "וריד הכבד (Hepatic Vein)": ["כבד (Liver)", "וריד הבטן (Inferior Vena Cava)"],
            "עורק הכליה (Renal Artery)": ["עורק הלב הראשי (Aorta)", "כליה (Kidney)"],
            "וריד הכליה (Renal Vein)": ["כליה (Kidney)", "וריד הבטן (Inferior Vena Cava)"],
            "עורק הירך (Femoral Artery)": ["עורק האגן (Iliac Artery)", "וריד הירך (Femoral Vein)"],
            "עורק האגן (Iliac Artery)": ["עורק הבטן (Abdominal Aorta)", "עורק הירך (Femoral Artery)"],
            "עורק הבטן (Abdominal Aorta)": ["עורק הלב הראשי (Aorta)", "עורק האגן (Iliac Artery)"],
            "וריד הירך (Femoral Vein)": ["עורק הירך (Femoral Artery)", "וריד האגן (Iliac Vein)"],
            "וריד האגן (Iliac Vein)": ["וריד הירך (Femoral Vein)", "וריד הבטן (Inferior Vena Cava)"],
            "כבד (Liver)": ["עורק הכבד (Hepatic Artery)", "וריד הכבד (Hepatic Vein)"],
            "כליה (Kidney)": ["עורק הכליה (Renal Artery)", "וריד הכליה (Renal Vein)"]
        }
    },
    
    nerves: {
        name: "עצבים",
        difficulty: "קשה",
        structures: {
            "עצב הראייה (Optic Nerve - CN II)": ["מוח (Brain)", "רשתית (Retina)"],
            "עצב השמיעה (Vestibulocochlear Nerve - CN VIII)": ["מוח (Brain)", "שבלול (Cochlea)"],
            "עצב הפנים (Facial Nerve - CN VII)": ["מוח (Brain)", "שרירי הפנים (Facial Muscles)"],
            "עצב התועה (Vagus Nerve - CN X)": ["מוח (Brain)", "חוט השדרה הצווארי (Cervical Spinal Cord)", "איברים פנימיים (Visceral Organs)"],
            "חוט השדרה הצווארי (Cervical Spinal Cord)": ["מוח (Brain)", "עצב התועה (Vagus Nerve - CN X)", "עצב הזרוע (Brachial Plexus)", "חוט השדרה החזי (Thoracic Spinal Cord)"],
            "עצב הזרוע (Brachial Plexus)": ["חוט השדרה הצווארי (Cervical Spinal Cord)", "זרוע (Arm)"],
            "חוט השדרה החזי (Thoracic Spinal Cord)": ["חוט השדרה הצווארי (Cervical Spinal Cord)", "עצב החזה (Thoracic Nerves)", "חוט השדרה המותני (Lumbar Spinal Cord)"],
            "עצב החזה (Thoracic Nerves)": ["חוט השדרה החזי (Thoracic Spinal Cord)", "חזה (Thorax)"],
            "חוט השדרה המותני (Lumbar Spinal Cord)": ["חוט השדרה החזי (Thoracic Spinal Cord)", "עצב המותן (Lumbar Nerves)", "עצב העצה (Sacral Plexus)"],
            "עצב המותן (Lumbar Nerves)": ["חוט השדרה המותני (Lumbar Spinal Cord)", "מותן (Lumbar Region)"],
            "עצב העצה (Sacral Plexus)": ["חוט השדרה המותני (Lumbar Spinal Cord)", "עצב הירך (Femoral Nerve)", "עצב השוק (Sciatic Nerve)"],
            "עצב הירך (Femoral Nerve)": ["עצב העצה (Sacral Plexus)", "ירך (Thigh)"],
            "עצב השוק (Sciatic Nerve)": ["עצב העצה (Sacral Plexus)", "שוק (Leg)"],
            "עצב כף הרגל (Tibial Nerve)": ["עצב השוק (Sciatic Nerve)", "כף רגל (Foot)"],
            "עצב כף היד (Median Nerve)": ["עצב הזרוע (Brachial Plexus)", "כף יד (Hand)"],
            "מוח (Brain)": ["עצב הראייה (Optic Nerve - CN II)", "עצב השמיעה (Vestibulocochlear Nerve - CN VIII)", "עצב הפנים (Facial Nerve - CN VII)", "עצב התועה (Vagus Nerve - CN X)"],
            "רשתית (Retina)": ["עצב הראייה (Optic Nerve - CN II)"],
            "שבלול (Cochlea)": ["עצב השמיעה (Vestibulocochlear Nerve - CN VIII)"],
            "שרירי הפנים (Facial Muscles)": ["עצב הפנים (Facial Nerve - CN VII)"],
            "איברים פנימיים (Visceral Organs)": ["עצב התועה (Vagus Nerve - CN X)"],
            "זרוע (Arm)": ["עצב הזרוע (Brachial Plexus)"],
            "חזה (Thorax)": ["עצב החזה (Thoracic Nerves)"],
            "מותן (Lumbar Region)": ["עצב המותן (Lumbar Nerves)"],
            "ירך (Thigh)": ["עצב הירך (Femoral Nerve)"],
            "שוק (Leg)": ["עצב השוק (Sciatic Nerve)"],
            "כף רגל (Foot)": ["עצב כף הרגל (Tibial Nerve)"],
            "כף יד (Hand)": ["עצב כף היד (Median Nerve)"]
        }
    }
};

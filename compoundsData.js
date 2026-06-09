/* =========================================================================
   STACKLAB — Universal Compound Database  (v2 · 100+ entries)
   Open · client-side · education-only · no personal data.

   Schema:
     id, name, category('peptide'|'supplement'|'oral'),
     route, class, halfLife, bioavailability,
     reversible('yes'|'caution'|'no'), evidence('A'|'B'|'C'|'D'|'X'),
     desc,
     targetOrgans:[{ organ, effect:'positive'|'negative'|'caution', note }],
     synergies:[{ id, reason }],  clashes:[{ id, risk }],
     bloodMarkerImpact:[str],  foodDrug:[{ with, effect }],
     dosingInfo, cautions:[str], cofactor, refs:[str]
   ========================================================================= */

window.ORGANS = [
  "Liver","Kidneys","Pancreas","Adipose Tissue","Skeletal Muscle","Brain / CNS",
  "Cardiovascular","Gut / GI","Immune System","Mitochondria","Endocrine",
  "Skin / Connective","Thyroid","Bone","Prostate / Repro"
];

window.GOAL_PRESETS = {
  longevity:{ label:"Longevity", icon:"∞", ids:["nad-plus","ss-31","mots-c","urolithin-a","fisetin","spermidine","ca-akg","glycine","nac","omega-3","rapamycin"] },
  general:{ label:"General Health", icon:"✚", ids:["omega-3","vitamin-d3","magnesium","creatine","nac","vitamin-b12","psyllium"] },
  cognitive:{ label:"Cognitive Performance", icon:"◉", ids:["semax","alpha-gpc","citicoline","l-theanine","caffeine","creatine","lions-mane","modafinil"] },
  fatloss:{ label:"Fat Loss", icon:"▼", ids:["retatrutide","tirzepatide","tesamorelin","mots-c","berberine","l-carnitine"] },
  muscle:{ label:"Muscle Gain / Retention", icon:"▲", ids:["tesamorelin","ipamorelin","cjc-1295","creatine","bpc-157","tb-500","testosterone"] },
  hormonal:{ label:"Hormonal / T-Optimization", icon:"♂", ids:["enclomiphene","tongkat-ali","boron","zinc","vitamin-d3","hcg"] }
};

/* tiny helpers to keep entries compact */
function O(organ,effect,note){return{organ,effect,note};}
function S(id,reason){return{id,reason};}
function C(id,risk){return{id,risk};}
function FD(w,effect){return{with:w,effect};}

window.COMPOUNDS = [
/* =============================== PEPTIDES — INCRETINS =============================== */
{ id:"retatrutide",name:"Retatrutide",category:"peptide",route:"SubQ (weekly)",class:"GLP-1/GIP/glucagon triple agonist",halfLife:"~6 days",bioavailability:"Subcutaneous",reversible:"yes",evidence:"B",
  desc:"Investigational triple incretin — the most powerful weight-loss agent tested; glucagon arm adds energy expenditure + liver-fat loss.",
  targetOrgans:[O("Adipose Tissue","positive","↑ lipolysis, energy expenditure"),O("Pancreas","positive","glucose-dependent insulin"),O("Liver","positive","↓ hepatic fat"),O("Brain / CNS","positive","appetite ↓"),O("Gut / GI","caution","slowed emptying, nausea"),O("Cardiovascular","caution","dose-dependent ↑HR")],
  synergies:[S("bpc-157","gut-trophic support may ease GI effects"),S("tesamorelin","systemic + visceral fat, different mechanisms")],
  clashes:[C("metformin","additive glucose-lowering → hypo"),C("bupropion","appetite↓ + dehydration lowers seizure threshold"),C("semaglutide","redundant GLP-1"),C("tirzepatide","redundant incretin")],
  bloodMarkerImpact:["↓ HbA1c","↓ glucose/insulin","↑ heart rate","↑ lipase (rare)"],
  foodDrug:[FD("Alcohol","worse GI + hypoglycemia/pancreatitis risk"),FD("Insulin/sulfonylureas","hypoglycemia — needs dose review")],
  dosingInfo:"Investigational; weekly SubQ with slow titration. Clinician-supervised; ranges are research-derived, not a directive.",
  cautions:["Unapproved/investigational","GI, ↑HR","Rapid loss → gallstones, ↑uric acid","Protect lean mass"],cofactor:"Track electrolytes/hydration; keep protein high.",
  refs:["Jastreboff et al., NEJM 2023 (phase 2)","TRIUMPH program (phase 3, ongoing)"] },

{ id:"semaglutide",name:"Semaglutide",category:"peptide",route:"SubQ/oral (weekly)",class:"GLP-1 receptor agonist",halfLife:"~7 days",bioavailability:"SubQ / oral",reversible:"yes",evidence:"A",
  desc:"First-gen incretin (Ozempic/Wegovy) — strong appetite suppression + glucose control; ~15% weight loss.",
  targetOrgans:[O("Adipose Tissue","positive","appetite-driven fat loss"),O("Pancreas","positive","insulin secretion"),O("Brain / CNS","positive","satiety"),O("Cardiovascular","positive","CV-outcome benefit (SELECT)"),O("Gut / GI","caution","nausea, slowed emptying")],
  synergies:[S("cagrilintide","amylin + GLP-1 (CagriSema)")],
  clashes:[C("retatrutide","redundant GLP-1"),C("tirzepatide","redundant incretin")],
  bloodMarkerImpact:["↓ HbA1c, glucose","↓ weight, ApoB","↑HR (mild)"],
  foodDrug:[FD("Alcohol","↑ GI upset, hypo risk"),FD("Oral meds","slowed emptying may alter absorption")],
  dosingInfo:"Weekly SubQ, titrated; oral form taken fasting with water. Prescriber-directed.",
  cautions:["GI effects","Gallstones with rapid loss","MTC/MEN2 boxed warning (class)"],cofactor:"Protein + resistance training to keep muscle.",
  refs:["STEP trials (NEJM 2021)","SELECT CV outcomes (NEJM 2023)"] },

{ id:"tirzepatide",name:"Tirzepatide",category:"peptide",route:"SubQ (weekly)",class:"GIP/GLP-1 dual agonist",halfLife:"~5 days",bioavailability:"Subcutaneous",reversible:"yes",evidence:"A",
  desc:"Dual incretin (Mounjaro/Zepbound) — ~15–21% weight loss; approved + strongly insulin-sensitizing.",
  targetOrgans:[O("Adipose Tissue","positive","fat loss"),O("Pancreas","positive","insulin sensitivity"),O("Liver","positive","↓ liver fat"),O("Brain / CNS","positive","appetite"),O("Gut / GI","caution","nausea")],
  synergies:[],clashes:[C("retatrutide","redundant incretin"),C("semaglutide","redundant GLP-1"),C("metformin","additive glucose-lowering")],
  bloodMarkerImpact:["↓ HbA1c, glucose, insulin","↓ TG, weight"],
  foodDrug:[FD("Alcohol","hypo + GI"),FD("Oral contraceptives","absorption altered after dose escalation")],
  dosingInfo:"Weekly SubQ, titrated 2.5→15 mg. The legal, approved incretin in most countries. Prescriber-directed.",
  cautions:["GI effects","Gallbladder","Class thyroid warning"],cofactor:"Protein + training.",
  refs:["SURMOUNT-1, NEJM 2022","SURPASS program"] },

{ id:"liraglutide",name:"Liraglutide",category:"peptide",route:"SubQ (daily)",class:"GLP-1 agonist",halfLife:"~13 h",bioavailability:"Subcutaneous",reversible:"yes",evidence:"A",
  desc:"Daily first-gen GLP-1 (Saxenda/Victoza) — milder than weekly agents.",
  targetOrgans:[O("Adipose Tissue","positive","appetite"),O("Pancreas","positive","insulin"),O("Gut / GI","caution","nausea")],
  synergies:[],clashes:[C("semaglutide","redundant GLP-1"),C("tirzepatide","redundant")],
  bloodMarkerImpact:["↓ HbA1c, weight"],foodDrug:[FD("Alcohol","hypo/GI")],
  dosingInfo:"Daily SubQ, titrated. Prescriber-directed.",cautions:["GI","Daily injections"],cofactor:null,refs:["SCALE trials"] },

{ id:"cagrilintide",name:"Cagrilintide",category:"peptide",route:"SubQ (weekly)",class:"Long-acting amylin analog",halfLife:"~8 days",bioavailability:"Subcutaneous",reversible:"yes",evidence:"B",
  desc:"Amylin analog that adds satiety/slowed emptying; pairs with semaglutide (CagriSema).",
  targetOrgans:[O("Brain / CNS","positive","satiety"),O("Gut / GI","caution","emptying"),O("Adipose Tissue","positive","weight loss")],
  synergies:[S("semaglutide","CagriSema synergy")],clashes:[C("retatrutide","additive appetite suppression — overkill")],
  bloodMarkerImpact:["↓ weight"],foodDrug:[],dosingInfo:"Weekly SubQ, often with a GLP-1. Investigational/clinical.",cautions:["Additive GI with incretins"],cofactor:null,refs:["REDEFINE program"] },

{ id:"survodutide",name:"Survodutide",category:"peptide",route:"SubQ (weekly)",class:"GLP-1/glucagon dual agonist",halfLife:"~6 days",bioavailability:"Subcutaneous",reversible:"yes",evidence:"B",
  desc:"GLP-1 + glucagon dual — strong MASH/liver-fat signal.",
  targetOrgans:[O("Liver","positive","↓ liver fat (MASH)"),O("Adipose Tissue","positive","fat loss"),O("Gut / GI","caution","nausea")],
  synergies:[],clashes:[C("retatrutide","overlapping incretin/glucagon")],
  bloodMarkerImpact:["↓ liver fat, weight"],foodDrug:[],dosingInfo:"Weekly SubQ, titrated. Investigational.",cautions:["GI","↑HR"],cofactor:null,refs:["Phase 2 MASH (NEJM 2024)"] },

{ id:"mazdutide",name:"Mazdutide",category:"peptide",route:"SubQ (weekly)",class:"GLP-1/glucagon dual agonist",halfLife:"~weekly",bioavailability:"Subcutaneous",reversible:"yes",evidence:"C",
  desc:"GLP-1/glucagon dual (OXM-based) in late-stage trials, esp. in Asia.",
  targetOrgans:[O("Adipose Tissue","positive","fat loss"),O("Liver","positive","liver fat"),O("Gut / GI","caution","nausea")],
  synergies:[],clashes:[C("retatrutide","redundant")],bloodMarkerImpact:["↓ weight, glucose"],foodDrug:[],dosingInfo:"Weekly SubQ. Investigational.",cautions:["GI"],cofactor:null,refs:["GLORY trials"] },

{ id:"aod-9604",name:"AOD-9604",category:"peptide",route:"SubQ",class:"GH fragment (176-191)",halfLife:"Short",bioavailability:"Subcutaneous",reversible:"yes",evidence:"D",
  desc:"GH fragment marketed for lipolysis without GH's glucose effects — failed human obesity trials.",
  targetOrgans:[O("Adipose Tissue","positive","claimed lipolysis (weak)")],
  synergies:[],clashes:[],bloodMarkerImpact:["minimal"],foodDrug:[],dosingInfo:"SubQ; education only.",cautions:["Failed obesity trials","Largely ineffective"],cofactor:null,refs:["Metabolic Pharma trials (negative)"] },

/* =============================== PEPTIDES — GH AXIS =============================== */
{ id:"tesamorelin",name:"Tesamorelin",category:"peptide",route:"SubQ (daily)",class:"GHRH analog",halfLife:"~26–38 min",bioavailability:"Subcutaneous",reversible:"yes",evidence:"A",
  desc:"Stabilized GHRH analog (Egrifta) — pulsatile GH; reduces visceral + liver fat.",
  targetOrgans:[O("Adipose Tissue","positive","visceral lipolysis"),O("Liver","positive","↓ liver fat"),O("Endocrine","positive","↑GH/IGF-1"),O("Skeletal Muscle","positive","lean"),O("Pancreas","caution","GH diabetogenic")],
  synergies:[S("ipamorelin","GHRH+GHRP amplify GH")],clashes:[C("cjc-1295","redundant GHRH")],
  bloodMarkerImpact:["↑ IGF-1","↑ glucose (watch)"],foodDrug:[FD("Carbohydrate at dose","blunts GH pulse")],
  dosingInfo:"Daily SubQ, typically at night away from carbs. Monitor IGF-1 + glucose.",cautions:["GH worsens insulin resistance","Avoid in malignancy","Monitor IGF-1"],cofactor:"Baseline + periodic IGF-1 & glucose.",refs:["Falutz, NEJM 2007","Stanley, Lancet HIV 2019"] },

{ id:"cjc-1295",name:"CJC-1295",category:"peptide",route:"SubQ",class:"GHRH analog",halfLife:"~30 min (no-DAC)/6–8 d (DAC)",bioavailability:"Subcutaneous",reversible:"yes",evidence:"C",
  desc:"GHRH analog; no-DAC preserves pulsatility (pairs with a GHRP), DAC is long-acting.",
  targetOrgans:[O("Endocrine","positive","↑GH/IGF-1"),O("Skeletal Muscle","positive","recovery"),O("Adipose Tissue","positive","lipolysis"),O("Pancreas","caution","GH diabetogenic")],
  synergies:[S("ipamorelin","GHRH+GHRP synergy")],clashes:[C("tesamorelin","redundant GHRH"),C("sermorelin","redundant GHRH")],
  bloodMarkerImpact:["↑ IGF-1","↑ glucose"],foodDrug:[FD("Carbohydrate","blunts GH pulse")],
  dosingInfo:"No-DAC dosed with a GHRP, away from carbs. Education only.",cautions:["Confirm DAC vs no-DAC","Monitor IGF-1"],cofactor:"Pair a GHRP, not a 2nd GHRH.",refs:["Teichman 2006 (PK/PD)"] },

{ id:"sermorelin",name:"Sermorelin",category:"peptide",route:"SubQ",class:"GHRH(1-29) analog",halfLife:"~10–20 min",bioavailability:"Subcutaneous",reversible:"yes",evidence:"C",
  desc:"Short GHRH analog — milder/older GH stimulator.",
  targetOrgans:[O("Endocrine","positive","↑GH"),O("Skeletal Muscle","positive","recovery"),O("Pancreas","caution","GH effect")],
  synergies:[S("ipamorelin","GHRH+GHRP")],clashes:[C("cjc-1295","redundant GHRH"),C("tesamorelin","redundant GHRH")],
  bloodMarkerImpact:["↑ IGF-1"],foodDrug:[FD("Carbohydrate","blunts pulse")],dosingInfo:"SubQ at night. Education only.",cautions:["Mild","Monitor IGF-1"],cofactor:null,refs:["Examine.com"] },

{ id:"ipamorelin",name:"Ipamorelin",category:"peptide",route:"SubQ",class:"GHRP (ghrelin/GHS-R agonist)",halfLife:"~2 h",bioavailability:"Subcutaneous",reversible:"yes",evidence:"C",
  desc:"Selective GH secretagogue — raises GH without cortisol/prolactin bump.",
  targetOrgans:[O("Endocrine","positive","clean GH pulse"),O("Skeletal Muscle","positive","recovery")],
  synergies:[S("tesamorelin","GHRP+GHRH"),S("cjc-1295","GHRP+GHRH"),S("sermorelin","GHRP+GHRH")],clashes:[],
  bloodMarkerImpact:["↑ IGF-1"],foodDrug:[FD("Food","blunts GH pulse")],dosingInfo:"Co-dosed with a GHRH analog, away from food.",cautions:["Mild appetite↑","Monitor IGF-1"],cofactor:null,refs:["Raun 1998"] },

{ id:"ghrp-2",name:"GHRP-2",category:"peptide",route:"SubQ",class:"GHRP (ghrelin agonist)",halfLife:"~30 min",bioavailability:"Subcutaneous",reversible:"yes",evidence:"C",
  desc:"Potent GH-releasing peptide; raises GH but also cortisol/prolactin somewhat.",
  targetOrgans:[O("Endocrine","positive","strong GH pulse"),O("Skeletal Muscle","positive","recovery"),O("Brain / CNS","caution","↑cortisol/prolactin")],
  synergies:[S("cjc-1295","GHRP+GHRH")],clashes:[C("ipamorelin","redundant GHRP — pick one"),C("ghrp-6","redundant GHRP")],
  bloodMarkerImpact:["↑ IGF-1","↑ cortisol/prolactin (mild)"],foodDrug:[FD("Food","blunts pulse")],dosingInfo:"SubQ with a GHRH. Education only.",cautions:["Cortisol/prolactin","Hunger"],cofactor:null,refs:["Examine.com"] },

{ id:"ghrp-6",name:"GHRP-6",category:"peptide",route:"SubQ",class:"GHRP (ghrelin agonist)",halfLife:"~30 min",bioavailability:"Subcutaneous",reversible:"yes",evidence:"C",
  desc:"GH-releasing peptide with strong hunger stimulation (ghrelin).",
  targetOrgans:[O("Endocrine","positive","GH pulse"),O("Gut / GI","positive","appetite/gut motility"),O("Brain / CNS","caution","cortisol")],
  synergies:[S("cjc-1295","GHRP+GHRH")],clashes:[C("ipamorelin","redundant GHRP"),C("ghrp-2","redundant GHRP")],
  bloodMarkerImpact:["↑ IGF-1"],foodDrug:[FD("Food","blunts pulse")],dosingInfo:"SubQ. Education only.",cautions:["Strong hunger","Cortisol"],cofactor:null,refs:["Examine.com"] },

{ id:"hexarelin",name:"Hexarelin",category:"peptide",route:"SubQ",class:"GHRP (potent)",halfLife:"~55 min",bioavailability:"Subcutaneous",reversible:"caution",evidence:"C",
  desc:"Most potent GHRP — strong GH but desensitizes the axis fastest + cardiac effects.",
  targetOrgans:[O("Endocrine","positive","strong GH"),O("Cardiovascular","caution","cardiac receptor effects"),O("Skeletal Muscle","positive","recovery")],
  synergies:[],clashes:[C("ipamorelin","redundant GHRP")],bloodMarkerImpact:["↑ IGF-1","↑ cortisol/prolactin"],foodDrug:[],dosingInfo:"SubQ, cycled to avoid desensitization. Education only.",cautions:["Desensitization","Cortisol/prolactin"],cofactor:null,refs:["Examine.com"] },

{ id:"hgh",name:"HGH (Somatropin)",category:"peptide",route:"SubQ",class:"Recombinant growth hormone",halfLife:"~3–4 h",bioavailability:"Subcutaneous",reversible:"caution",evidence:"A",
  desc:"Exogenous GH — overrides pulsatile feedback; potent but strongly diabetogenic with irreversible acromegalic risk at high chronic doses.",
  targetOrgans:[O("Skeletal Muscle","positive","lean/recovery"),O("Adipose Tissue","positive","lipolysis"),O("Endocrine","positive","↑IGF-1"),O("Pancreas","negative","insulin resistance"),O("Bone","caution","acromegalic growth (chronic)")],
  synergies:[],clashes:[C("tesamorelin","redundant (direct GH vs secretagogue)")],
  bloodMarkerImpact:["↑ IGF-1","↑ glucose/insulin resistance"],foodDrug:[],dosingInfo:"SubQ daily; clinician-only, lab-monitored.",cautions:["Diabetogenic","Acromegalic features (chronic, irreversible)","Carpal tunnel, edema","Avoid in malignancy"],cofactor:"Monitor IGF-1 + glucose closely.",refs:["FDA label (somatropin)"] },

{ id:"mk-677",name:"MK-677 (Ibutamoren)",category:"oral",route:"Oral (daily)",class:"Oral ghrelin-receptor GH secretagogue",halfLife:"~24 h",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"Oral GH secretagogue — sustained ↑GH/IGF-1, appetite, sleep; can raise glucose + cause water retention.",
  targetOrgans:[O("Endocrine","positive","↑GH/IGF-1"),O("Skeletal Muscle","positive","lean/recovery"),O("Brain / CNS","positive","deep sleep, appetite"),O("Pancreas","caution","↑ glucose/insulin resistance")],
  synergies:[],clashes:[],bloodMarkerImpact:["↑ IGF-1","↑ fasting glucose","↑ cortisol (mild)"],foodDrug:[],dosingInfo:"Oral once daily (often PM). Education only.",cautions:["Water retention","Insulin resistance","Lethargy in some"],cofactor:"Monitor glucose + IGF-1.",refs:["Murphy 1998; Nass 2008"] },

{ id:"igf1-lr3",name:"IGF-1 LR3",category:"peptide",route:"SubQ",class:"Long-acting IGF-1 analog",halfLife:"~20–30 h",bioavailability:"Subcutaneous",reversible:"no",evidence:"C",
  desc:"Sustained IGF-1 → muscle hyperplasia/hypertrophy; diabetogenic + proliferative (cancer/organ growth) risk.",
  targetOrgans:[O("Skeletal Muscle","positive","hypertrophy/hyperplasia"),O("Pancreas","negative","hypoglycemia/IR"),O("Gut / GI","caution","organ/gut growth"),O("Liver","caution","proliferation")],
  synergies:[],clashes:[C("hgh","additive IGF-1 overload")],bloodMarkerImpact:["↑ IGF-1","↓ glucose (hypo risk)"],foodDrug:[],dosingInfo:"Education only — high-risk, clinician territory.",cautions:["Hypoglycemia","Proliferation/cancer risk (irreversible)","Organ/gut growth"],cofactor:"Measure IGF-1 + glucose; not for insulin resistance.",refs:["Mechanistic literature"] },

{ id:"mgf",name:"PEG-MGF",category:"peptide",route:"SubQ",class:"Mechano Growth Factor (IGF-1Ec)",halfLife:"Pegylated (longer)",bioavailability:"Subcutaneous",reversible:"no",evidence:"D",
  desc:"IGF-1 splice variant for local muscle repair; IGF/proliferation pathway risks.",
  targetOrgans:[O("Skeletal Muscle","positive","satellite-cell repair"),O("Liver","caution","proliferation")],
  synergies:[],clashes:[C("igf1-lr3","redundant IGF signaling")],bloodMarkerImpact:["local (research)"],foodDrug:[],dosingInfo:"Education only.",cautions:["Proliferation/cancer caution (irreversible)","No human RCTs"],cofactor:null,refs:["Animal data"] },

{ id:"follistatin-344",name:"Follistatin-344",category:"peptide",route:"SubQ",class:"Myostatin/activin inhibitor",halfLife:"Short",bioavailability:"Subcutaneous",reversible:"caution",evidence:"D",
  desc:"De-represses muscle growth via a non-GH pathway; experimental + huge product-authenticity issues.",
  targetOrgans:[O("Skeletal Muscle","positive","growth beyond GH"),O("Skin / Connective","caution","tendon may lag muscle"),O("Cardiovascular","caution","myostatin in heart")],
  synergies:[],clashes:[],bloodMarkerImpact:["body comp (research)"],foodDrug:[],dosingInfo:"Education only; gray-market often fake/wrong isoform.",cautions:["Fake-product nightmare","Tendon/cardiac unknowns"],cofactor:null,refs:["AAV-follistatin gene-therapy trials"] },

{ id:"ace-031",name:"ACE-031",category:"peptide",route:"SubQ",class:"ActRIIB decoy (myostatin/activin)",halfLife:"Long (Fc)",bioavailability:"Subcutaneous",reversible:"caution",evidence:"C",
  desc:"Activin-receptor decoy → muscle growth; human trials halted for vascular safety.",
  targetOrgans:[O("Skeletal Muscle","positive","myostatin inhibition"),O("Cardiovascular","negative","telangiectasia/bleeding (trials)")],
  synergies:[],clashes:[C("follistatin-344","redundant myostatin pathway")],bloodMarkerImpact:["muscle markers"],foodDrug:[],dosingInfo:"Education only.",cautions:["Trials HALTED for safety (bleeding, spider veins)"],cofactor:null,refs:["Campbell 2017 (DMD, discontinued)"] },

/* =============================== PEPTIDES — HEALING / IMMUNE =============================== */
{ id:"bpc-157",name:"BPC-157",category:"peptide",route:"SubQ / oral",class:"Body-protection pentadecapeptide",halfLife:"Short (mins)",bioavailability:"SubQ / oral (gut-local)",reversible:"yes",evidence:"C",
  desc:"Healing peptide for tendon, gut, soft tissue; strong animal data, minimal human trials.",
  targetOrgans:[O("Gut / GI","positive","mucosal healing"),O("Skin / Connective","positive","tendon/ligament repair"),O("Skeletal Muscle","positive","recovery")],
  synergies:[S("tb-500","complementary repair pairing"),S("ghk-cu","regeneration + collagen"),S("kpv","gut anti-inflammatory")],clashes:[],
  bloodMarkerImpact:["none directly"],foodDrug:[],dosingInfo:"SubQ systemic / oral gut-local. Education only.",cautions:["No human RCTs","Theoretical angiogenesis/tumor caution","RC purity"],cofactor:null,refs:["Animal models (Sikiric)"] },

{ id:"tb-500",name:"TB-500",category:"peptide",route:"SubQ",class:"Thymosin Beta-4 fragment",halfLife:"Longer (2×/wk)",bioavailability:"Subcutaneous",reversible:"yes",evidence:"C",
  desc:"Actin-regulating peptide for systemic soft-tissue recovery + angiogenesis (animal).",
  targetOrgans:[O("Skeletal Muscle","positive","migration/repair"),O("Cardiovascular","positive","endothelial repair (animal)"),O("Immune System","positive","anti-inflammatory")],
  synergies:[S("bpc-157","recovery synergy")],clashes:[],bloodMarkerImpact:["none directly"],foodDrug:[],dosingInfo:"SubQ load→maintenance. Education only.",cautions:["No human RCTs","Tumor caution (theoretical)"],cofactor:null,refs:["TB4 animal studies"] },

{ id:"ghk-cu",name:"GHK-Cu",category:"peptide",route:"Topical / SubQ",class:"Copper tripeptide",halfLife:"Short",bioavailability:"Topical / SubQ",reversible:"yes",evidence:"B",
  desc:"Copper peptide — strong topical skin/collagen evidence; systemic use carries a copper load.",
  targetOrgans:[O("Skin / Connective","positive","collagen, wound healing"),O("Immune System","positive","antioxidant"),O("Liver","caution","copper handling")],
  synergies:[S("bpc-157","tissue regeneration")],clashes:[C("zinc","copper:zinc competition (chronic)")],
  bloodMarkerImpact:["↑ copper","↓ zinc (chronic)"],foodDrug:[],dosingInfo:"Topical for skin; SubQ delivers ~0.4 mg Cu/day.",cautions:["Copper accumulation/zinc displacement","Avoid copper-overload states"],cofactor:"Check Cu + Zn if chronic.",refs:["Pickart, topical literature"] },

{ id:"kpv",name:"KPV",category:"peptide",route:"SubQ / oral",class:"α-MSH(11-13) anti-inflammatory tripeptide",halfLife:"Short",bioavailability:"SubQ / oral (gut)",reversible:"yes",evidence:"C",
  desc:"Anti-inflammatory α-MSH fragment — NF-κB inhibition, gut + skin (animal/cell).",
  targetOrgans:[O("Immune System","positive","NF-κB inhibition"),O("Gut / GI","positive","mucosal anti-inflammatory")],
  synergies:[S("bpc-157","gut healing + anti-inflammatory")],clashes:[],bloodMarkerImpact:["↓ CRP (theoretical)"],foodDrug:[],dosingInfo:"SubQ or oral for gut. Education only.",cautions:["Minimal human data"],cofactor:null,refs:["Colitis models"] },

{ id:"ara-290",name:"Ara-290 (Cibinetide)",category:"peptide",route:"SubQ",class:"EPO-derived innate-repair agonist",halfLife:"Short",bioavailability:"Subcutaneous",reversible:"yes",evidence:"C",
  desc:"Anti-inflammatory + nerve/tissue repair without raising red cells (no clot risk).",
  targetOrgans:[O("Immune System","positive","anti-inflammatory"),O("Brain / CNS","positive","neuropathy/repair")],
  synergies:[],clashes:[],bloodMarkerImpact:["inflammatory markers"],foodDrug:[],dosingInfo:"SubQ. Education only.",cautions:["Niche (neuropathy)","Limited human data"],cofactor:null,refs:["Diabetic/sarcoid neuropathy trials"] },

{ id:"ll-37",name:"LL-37",category:"peptide",route:"SubQ",class:"Cathelicidin antimicrobial peptide",halfLife:"Short",bioavailability:"Subcutaneous",reversible:"caution",evidence:"C",
  desc:"Antimicrobial/anti-biofilm peptide — but also pro-inflammatory (autoimmune flare risk).",
  targetOrgans:[O("Immune System","caution","double-edged: anti-microbial yet pro-inflammatory"),O("Gut / GI","positive","biofilm/SIBO")],
  synergies:[],clashes:[],bloodMarkerImpact:["inflammatory"],foodDrug:[],dosingInfo:"Niche; only with an infection/biofilm indication.",cautions:["Pro-inflammatory / autoimmune flare risk","Limited data"],cofactor:null,refs:["Cathelicidin literature"] },

{ id:"thymosin-a1",name:"Thymosin Alpha-1",category:"peptide",route:"SubQ",class:"Thymic immune peptide",halfLife:"~2 h",bioavailability:"Subcutaneous",reversible:"yes",evidence:"B",
  desc:"Immune-modulating thymic peptide — used as an adjuvant in infection/immune contexts.",
  targetOrgans:[O("Immune System","positive","T-cell modulation")],synergies:[],clashes:[],bloodMarkerImpact:["immune markers"],foodDrug:[],dosingInfo:"SubQ. Education only.",cautions:["Autoimmune caution"],cofactor:null,refs:["Zadaxin clinical use"] },

{ id:"thymalin",name:"Thymalin",category:"peptide",route:"SubQ",class:"Thymic bioregulator",halfLife:"Short",bioavailability:"Subcutaneous",reversible:"yes",evidence:"D",
  desc:"Russian thymic bioregulator — immune/longevity claims, minimal Western data.",
  targetOrgans:[O("Immune System","positive","immune restoration (claimed)")],synergies:[],clashes:[],bloodMarkerImpact:["immune"],foodDrug:[],dosingInfo:"Education only.",cautions:["Weak evidence"],cofactor:null,refs:["Khavinson group"] },

{ id:"vip",name:"VIP",category:"peptide",route:"Intranasal",class:"Vasoactive Intestinal Peptide",halfLife:"~minutes",bioavailability:"Intranasal",reversible:"yes",evidence:"C",
  desc:"Potent vasodilator + anti-inflammatory; niche CIRS/pulmonary use. Lowers BP.",
  targetOrgans:[O("Immune System","positive","anti-inflammatory"),O("Cardiovascular","caution","vasodilation / ↓BP"),O("Endocrine","caution","prolactin/secretion")],
  synergies:[],clashes:[],bloodMarkerImpact:["↓ BP"],foodDrug:[FD("Antihypertensives","additive ↓BP")],dosingInfo:"Intranasal; needs BP baseline. Education only.",cautions:["Vasoactive — drops BP","Hormonally active"],cofactor:"Check BP first.",refs:["CIRS protocols (low-quality)"] },

/* =============================== PEPTIDES — NOOTROPIC / NEURO =============================== */
{ id:"semax",name:"Semax",category:"peptide",route:"Intranasal (AM)",class:"ACTH(4-10) nootropic analog",halfLife:"Minutes (effects outlast)",bioavailability:"Intranasal",reversible:"yes",evidence:"C",
  desc:"Nootropic peptide — ↑BDNF, dopamine modulation; focus, neuroprotection, reaction time.",
  targetOrgans:[O("Brain / CNS","positive","↑BDNF, focus")],synergies:[S("selank","AM activate / PM calm")],clashes:[],bloodMarkerImpact:["subjective"],foodDrug:[FD("Caffeine","additive activation")],dosingInfo:"Intranasal, morning. Education only.",cautions:["Limited Western RCTs","Over-activation if late"],cofactor:null,refs:["Russian clinical use"] },

{ id:"selank",name:"Selank",category:"peptide",route:"Intranasal (PM)",class:"Tuftsin analog (anxiolytic)",halfLife:"Minutes",bioavailability:"Intranasal",reversible:"yes",evidence:"C",
  desc:"Anxiolytic nootropic — calm without sedation/dependence.",
  targetOrgans:[O("Brain / CNS","positive","anxiolytic, mood"),O("Immune System","positive","cytokine modulation")],synergies:[S("semax","day/night balance")],clashes:[],bloodMarkerImpact:["subjective"],foodDrug:[],dosingInfo:"Intranasal, evening. Education only.",cautions:["Limited Western RCTs"],cofactor:null,refs:["Russian clinical use"] },

{ id:"dihexa",name:"Dihexa",category:"peptide",route:"Oral / transdermal",class:"Angiotensin-IV analog (HGF/c-Met)",halfLife:"Hours",bioavailability:"Oral-active",reversible:"caution",evidence:"D",
  desc:"Ultra-potent synaptogenic peptide (claims » BDNF); no human data, c-Met cancer-pathway caution.",
  targetOrgans:[O("Brain / CNS","positive","synaptogenesis/memory"),O("Immune System","caution","c-Met proliferation pathway")],synergies:[],clashes:[],bloodMarkerImpact:["subjective"],foodDrug:[],dosingInfo:"Education only.",cautions:["No human data","c-Met/cancer-pathway caution"],cofactor:null,refs:["Rodent studies (WSU)"] },

{ id:"cerebrolysin",name:"Cerebrolysin",category:"peptide",route:"IM / IV (course)",class:"Neurotrophic peptide mix",halfLife:"Course-based",bioavailability:"IM/IV",reversible:"yes",evidence:"B",
  desc:"Porcine-brain neurotrophic peptide mix — real human RCTs (stroke/dementia/TBI).",
  targetOrgans:[O("Brain / CNS","positive","neurotrophic / BDNF-like")],synergies:[S("semax","cognitive support")],clashes:[],bloodMarkerImpact:["cognitive (clinical)"],foodDrug:[],dosingInfo:"IM/IV in courses. Education only.",cautions:["Porcine allergy","Benefit mostly clinical populations"],cofactor:null,refs:["Cochrane reviews (stroke/VaD)"] },

{ id:"pinealon",name:"Pinealon",category:"peptide",route:"SubQ / intranasal",class:"Neuro bioregulator (Glu-Asp-Arg)",halfLife:"Short",bioavailability:"SubQ/IN",reversible:"yes",evidence:"D",
  desc:"Russian neuropeptide bioregulator — cognitive/sleep claims, minimal evidence.",
  targetOrgans:[O("Brain / CNS","positive","neuroprotection (claimed)")],synergies:[S("epitalon","bioregulator pair")],clashes:[],bloodMarkerImpact:["subjective"],foodDrug:[],dosingInfo:"Education only.",cautions:["Weak evidence","Overlaps other nootropics"],cofactor:null,refs:["Khavinson group"] },

{ id:"dsip",name:"DSIP",category:"peptide",route:"SubQ (PM)",class:"Delta Sleep-Inducing Peptide",halfLife:"~minutes",bioavailability:"Subcutaneous",reversible:"yes",evidence:"C",
  desc:"Sleep-onset/slow-wave peptide; weak/mixed evidence.",
  targetOrgans:[O("Brain / CNS","positive","sleep onset/depth")],synergies:[S("melatonin","sleep")],clashes:[],bloodMarkerImpact:["subjective"],foodDrug:[],dosingInfo:"SubQ pre-sleep. Education only.",cautions:["Weak evidence","Fix circadian timing first"],cofactor:null,refs:["Older sleep studies"] },

{ id:"epitalon",name:"Epitalon",category:"peptide",route:"SubQ",class:"Pineal bioregulator (telomerase claim)",halfLife:"Short",bioavailability:"Subcutaneous",reversible:"yes",evidence:"D",
  desc:"Khavinson tetrapeptide — telomerase/circadian/longevity claims; minimal Western replication.",
  targetOrgans:[O("Endocrine","positive","pineal/melatonin (claimed)"),O("Brain / CNS","positive","circadian/sleep")],synergies:[S("pinealon","bioregulator pair")],clashes:[],bloodMarkerImpact:["telomere (claimed)"],foodDrug:[],dosingInfo:"Pulsed courses. Education only.",cautions:["Weak evidence"],cofactor:null,refs:["Khavinson group"] },

/* =============================== PEPTIDES — SEXUAL / REPRO =============================== */
{ id:"pt-141",name:"PT-141 (Bremelanotide)",category:"peptide",route:"SubQ / intranasal",class:"Melanocortin agonist (libido)",halfLife:"~2 h",bioavailability:"SubQ/IN",reversible:"yes",evidence:"A",
  desc:"Centrally-acting libido peptide (approved, Vyleesi) — works via melanocortin, not vasculature.",
  targetOrgans:[O("Brain / CNS","positive","libido/arousal"),O("Cardiovascular","caution","transient ↑BP"),O("Prostate / Repro","positive","sexual function")],synergies:[],clashes:[],bloodMarkerImpact:["transient ↑BP"],foodDrug:[FD("Antihypertensives","BP interaction")],dosingInfo:"On-demand SubQ/IN. Prescriber-directed (Vyleesi).",cautions:["Nausea","Transient ↑BP","Caution in uncontrolled HTN"],cofactor:null,refs:["Vyleesi FDA approval"] },

{ id:"melanotan-2",name:"Melanotan-2",category:"peptide",route:"SubQ",class:"Melanocortin agonist (tanning)",halfLife:"~hours",bioavailability:"Subcutaneous",reversible:"no",evidence:"C",
  desc:"Tanning + libido peptide — but darkens/changes moles (melanoma concern).",
  targetOrgans:[O("Skin / Connective","caution","tanning; mole/melanoma risk"),O("Brain / CNS","positive","libido"),O("Gut / GI","caution","nausea")],synergies:[],clashes:[],bloodMarkerImpact:["—"],foodDrug:[],dosingInfo:"Education only.",cautions:["Melanoma / mole change (irreversible risk)","Nausea, flushing"],cofactor:"Dermatology mole checks.",refs:["Case reports"] },

{ id:"kisspeptin",name:"Kisspeptin-10",category:"peptide",route:"SubQ",class:"GnRH-axis trigger",halfLife:"~4 min",bioavailability:"Subcutaneous",reversible:"yes",evidence:"C",
  desc:"Upstream HPG trigger (GnRH→LH→T) + libido — but ~4 min half-life + pulsatile requirement make it impractical.",
  targetOrgans:[O("Endocrine","positive","↑LH → testosterone (transient)"),O("Brain / CNS","positive","libido")],synergies:[],clashes:[],bloodMarkerImpact:["↑ LH/T (transient)"],foodDrug:[],dosingInfo:"Pulsatile dosing needed; -10 form is short-acting. Education only.",cautions:["Very short half-life","Desensitization if mis-dosed"],cofactor:null,refs:["Dhillo lab (HPG/libido)"] },

{ id:"oxytocin",name:"Oxytocin",category:"peptide",route:"Intranasal / SubQ",class:"Neuropeptide hormone",halfLife:"~minutes",bioavailability:"IN / SubQ",reversible:"yes",evidence:"B",
  desc:"Bonding/mood neuropeptide; some social-anxiety and intimacy use.",
  targetOrgans:[O("Brain / CNS","positive","bonding/mood"),O("Endocrine","positive","oxytocinergic")],synergies:[],clashes:[],bloodMarkerImpact:["subjective"],foodDrug:[],dosingInfo:"Intranasal. Education only.",cautions:["Mixed evidence"],cofactor:null,refs:["Social-cognition trials"] },

{ id:"hcg",name:"HCG",category:"oral",route:"SubQ / IM",class:"LH-mimetic gonadotropin (Rx)",halfLife:"~24–36 h",bioavailability:"SubQ/IM",reversible:"yes",evidence:"A",
  desc:"Mimics LH → stimulates testicular testosterone + preserves fertility; used in TRT/PCT.",
  targetOrgans:[O("Endocrine","positive","↑ intratesticular testosterone"),O("Prostate / Repro","positive","fertility/testes size")],synergies:[S("enclomiphene","HPTA support")],clashes:[],bloodMarkerImpact:["↑ testosterone","↑ estradiol (watch)"],foodDrug:[],dosingInfo:"SubQ/IM; prescriber-directed.",cautions:["Estradiol rise","Desensitization at high dose"],cofactor:"Monitor estradiol.",refs:["TRT/fertility literature"] },

/* =============================== PEPTIDES — MITO / METABOLIC =============================== */
{ id:"mots-c",name:"MOTS-c",category:"peptide",route:"SubQ",class:"Mitochondrial-derived peptide (AMPK)",halfLife:"Short",bioavailability:"Subcutaneous",reversible:"yes",evidence:"C",
  desc:"AMPK 'exercise mimetic' — improves insulin sensitivity + metabolic flexibility.",
  targetOrgans:[O("Mitochondria","positive","AMPK/biogenesis"),O("Skeletal Muscle","positive","metabolic flexibility"),O("Pancreas","positive","insulin sensitivity"),O("Adipose Tissue","positive","fat oxidation")],
  synergies:[S("ss-31","membrane repaired first, then metabolic signal"),S("nad-plus","fuels the machinery")],clashes:[C("aicar","redundant AMPK exercise-mimetic")],
  bloodMarkerImpact:["↓ glucose","↑ insulin sensitivity"],foodDrug:[],dosingInfo:"SubQ daily–EOD. Mostly animal data.",cautions:["Limited human data","Headache/flush/GI"],cofactor:null,refs:["Lee 2015; NCT07505745 (IR trial)"] },

{ id:"ss-31",name:"SS-31 (Elamipretide)",category:"peptide",route:"SubQ",class:"Mitochondria-targeted antioxidant",halfLife:"Short",bioavailability:"Subcutaneous",reversible:"yes",evidence:"C",
  desc:"Cardiolipin-binding peptide — stabilizes the inner mitochondrial membrane, ↓ROS. Human trials mixed.",
  targetOrgans:[O("Mitochondria","positive","cristae stability, ↓ROS"),O("Cardiovascular","positive","cardiac energetics")],
  synergies:[S("mots-c","repair then signal"),S("nad-plus","antioxidant + substrate")],clashes:[],bloodMarkerImpact:["—"],foodDrug:[],dosingInfo:"Daily SubQ; well-tolerated to 40 mg/day in trials.",cautions:["Inconsistent human efficacy","RC purity"],cofactor:null,refs:["MMPOWER trials; Barth syndrome"] },

{ id:"foxo4-dri",name:"FOXO4-DRI",category:"peptide",route:"SubQ (pulsed)",class:"Senolytic peptide",halfLife:"Short",bioavailability:"Subcutaneous",reversible:"no",evidence:"D",
  desc:"FOXO4-p53 disruptor → apoptosis of senescent cells; essentially no human data.",
  targetOrgans:[O("Immune System","positive","senescent-cell clearance"),O("Kidneys","caution","off-target apoptosis (animal)")],synergies:[],clashes:[],bloodMarkerImpact:["senescence markers (research)"],foodDrug:[],dosingInfo:"Pulsed; research-grade only.",cautions:["No human data","Irreversible cell death","Off-target risk"],cofactor:null,refs:["Baar 2017, Cell (mouse)"] },

{ id:"5-amino-1mq",name:"5-Amino-1MQ",category:"supplement",route:"Oral",class:"NNMT inhibitor",halfLife:"Hours",bioavailability:"Oral",reversible:"yes",evidence:"D",
  desc:"NNMT inhibitor — raises NAD+/SAM in fat cells; animal recomp data.",
  targetOrgans:[O("Adipose Tissue","positive","fat reduction (animal)"),O("Skeletal Muscle","positive","lean support"),O("Mitochondria","positive","NAD+")],synergies:[S("nad-plus","NAD axis")],clashes:[],bloodMarkerImpact:["research"],foodDrug:[],dosingInfo:"Oral; animal-only. Education only.",cautions:["No human data"],cofactor:null,refs:["Preclinical NNMT studies"] },

{ id:"slu-pp-332",name:"SLU-PP-332",category:"supplement",route:"SubQ / oral",class:"ERRα agonist (exercise mimetic)",halfLife:"Short",bioavailability:"SubQ/oral",reversible:"yes",evidence:"D",
  desc:"ERRα agonist — fat loss + endurance in mice without diet change; no human data.",
  targetOrgans:[O("Mitochondria","positive","biogenesis"),O("Skeletal Muscle","positive","endurance"),O("Adipose Tissue","positive","fat oxidation"),O("Cardiovascular","caution","ERR in heart (chronic unknown)")],synergies:[],clashes:[C("mots-c","overlapping exercise-mimetic")],bloodMarkerImpact:["research"],foodDrug:[],dosingInfo:"Education only — animal-stage.",cautions:["No human data","Cardiac ERR unknown"],cofactor:null,refs:["Billon/Burris 2023"] },

{ id:"aicar",name:"AICAR",category:"supplement",route:"SubQ",class:"AMPK activator (exercise mimetic)",halfLife:"Short",bioavailability:"Poor (injectable)",reversible:"yes",evidence:"D",
  desc:"AMPK activator — endurance/fat oxidation; poor bioavailability, WADA-banned.",
  targetOrgans:[O("Skeletal Muscle","positive","endurance"),O("Mitochondria","positive","AMPK"),O("Adipose Tissue","positive","fat oxidation")],synergies:[],clashes:[C("mots-c","redundant AMPK mimetic")],bloodMarkerImpact:["research"],foodDrug:[],dosingInfo:"High doses needed; education only.",cautions:["Poor bioavailability","Banned in sport"],cofactor:null,refs:["Narkar 2008"] },

/* =============================== SUPPLEMENTS — METABOLIC =============================== */
{ id:"nad-plus",name:"NAD+ (NR / NMN)",category:"supplement",route:"Oral / IV",class:"NAD precursor / coenzyme",halfLife:"Precursor-dependent",bioavailability:"Oral (NR/NMN) / IV",reversible:"yes",evidence:"B",
  desc:"Central redox coenzyme + sirtuin/PARP substrate. Precursors reliably raise NAD+; benefits modest.",
  targetOrgans:[O("Mitochondria","positive","energy/sirtuins"),O("Liver","positive","metabolic"),O("Brain / CNS","positive","neuroprotective (emerging)")],
  synergies:[S("mots-c","fuels mito signaling"),S("ss-31","repair + fuel set"),S("urolithin-a","mitochondrial support"),S("ca-akg","longevity stack")],clashes:[C("niacin","niacin form raises uric acid")],
  bloodMarkerImpact:["↑ NAD+","↑ insulin sensitivity (modest)"],foodDrug:[],dosingInfo:"Prefer oral NR/NMN; avoid high-dose niacin form.",cautions:["Theoretical proliferation caution","IV: infusion flushing"],cofactor:null,refs:["Yoshino 2021 (NMN, IR)"] },

{ id:"berberine",name:"Berberine",category:"supplement",route:"Oral",class:"AMPK activator",halfLife:"Hours (divided)",bioavailability:"Oral (low; dihydroberberine better)",reversible:"yes",evidence:"B",
  desc:"'Nature's metformin' — lowers glucose, HbA1c, LDL via AMPK.",
  targetOrgans:[O("Liver","positive","AMPK/lipids"),O("Pancreas","positive","glucose"),O("Gut / GI","caution","GI upset"),O("Adipose Tissue","positive","metabolic")],
  synergies:[],clashes:[C("metformin","additive glucose-lowering"),C("retatrutide","additive glucose-lowering")],
  bloodMarkerImpact:["↓ glucose/HbA1c","↓ LDL/TG"],foodDrug:[FD("CYP3A4 drugs","berberine inhibits CYP — raises levels"),FD("Grapefruit","additive CYP3A4 inhibition")],dosingInfo:"Split with meals. Education only.",cautions:["GI upset","CYP interactions","Monitor glucose"],cofactor:null,refs:["Meta-analyses (glucose/lipids)"] },

{ id:"metformin",name:"Metformin",category:"oral",route:"Oral (Rx)",class:"Biguanide",halfLife:"~5–6 h",bioavailability:"Oral",reversible:"yes",evidence:"A",
  desc:"First-line glucose drug + longevity-research staple; ↓ hepatic glucose output.",
  targetOrgans:[O("Liver","positive","↓ glucose output"),O("Pancreas","positive","insulin sensitivity"),O("Gut / GI","caution","GI upset; B12 malabsorption")],
  synergies:[],clashes:[C("berberine","additive glucose-lowering"),C("retatrutide","additive glucose-lowering")],
  bloodMarkerImpact:["↓ glucose/HbA1c","↓ B12 (chronic)","↑ lactate (rare)"],foodDrug:[FD("Alcohol","lactic-acidosis risk"),FD("Contrast dye","hold around imaging")],dosingInfo:"Titrate with meals. Prescriber-directed.",cautions:["B12 depletion","Avoid in renal impairment","May blunt some exercise gains"],cofactor:"Monitor/supplement B12.",refs:["UKPDS; TAME (longevity, ongoing)"] },

{ id:"myo-inositol",name:"Myo-Inositol",category:"supplement",route:"Oral",class:"Insulin second-messenger",halfLife:"Hours",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"Gentle insulin sensitizer (strongest data in PCOS/metabolic syndrome).",
  targetOrgans:[O("Pancreas","positive","insulin signaling"),O("Endocrine","positive","ovarian/metabolic")],synergies:[S("berberine","metabolic")],clashes:[],bloodMarkerImpact:["↑ insulin sensitivity"],foodDrug:[],dosingInfo:"~2–4 g (40:1 myo:DCI). Education only.",cautions:["Very well tolerated"],cofactor:null,refs:["PCOS RCTs"] },

{ id:"alpha-lipoic-acid",name:"Alpha-Lipoic Acid",category:"supplement",route:"Oral / IV",class:"Antioxidant / glucose",halfLife:"~30 min",bioavailability:"Oral (fasted)",reversible:"yes",evidence:"B",
  desc:"Mitochondrial antioxidant — glucose handling + diabetic neuropathy.",
  targetOrgans:[O("Mitochondria","positive","antioxidant"),O("Pancreas","positive","glucose uptake"),O("Brain / CNS","positive","neuropathy")],synergies:[],clashes:[],bloodMarkerImpact:["↓ glucose (mild)"],foodDrug:[FD("Thyroid meds","may interfere — separate")],dosingInfo:"Fasted; R-ALA more potent. Education only.",cautions:["Can lower glucose","Rare biotin depletion"],cofactor:null,refs:["Diabetic neuropathy trials"] },

{ id:"l-carnitine",name:"L-Carnitine",category:"supplement",route:"Oral / injectable",class:"Fat-oxidation cofactor",halfLife:"Hours",bioavailability:"Oral (low)/injectable",reversible:"yes",evidence:"C",
  desc:"Shuttles fatty acids into mitochondria; modest recovery/fat support. Raises TMAO.",
  targetOrgans:[O("Mitochondria","positive","fatty-acid transport"),O("Skeletal Muscle","positive","recovery"),O("Cardiovascular","caution","↑ TMAO")],synergies:[],clashes:[],bloodMarkerImpact:["↑ TMAO"],foodDrug:[],dosingInfo:"Oral/injectable. Education only.",cautions:["TMAO/CV association","Weak fat-loss evidence"],cofactor:null,refs:["Examine.com"] },

{ id:"chromium",name:"Chromium Picolinate",category:"supplement",route:"Oral",class:"Trace mineral (glucose)",halfLife:"—",bioavailability:"Oral (low)",reversible:"yes",evidence:"C",
  desc:"Trace mineral with modest glucose/craving effects.",
  targetOrgans:[O("Pancreas","positive","insulin (modest)")],synergies:[],clashes:[],bloodMarkerImpact:["glucose (modest)"],foodDrug:[],dosingInfo:"Oral. Education only.",cautions:["Modest effect"],cofactor:null,refs:["Mixed RCTs"] },

/* =============================== SUPPLEMENTS — LONGEVITY / MITO =============================== */
{ id:"urolithin-a",name:"Urolithin A",category:"supplement",route:"Oral",class:"Mitophagy inducer",halfLife:"Hours",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"Triggers mitophagy — human data for muscle strength/endurance.",
  targetOrgans:[O("Mitochondria","positive","mitophagy"),O("Skeletal Muscle","positive","endurance/strength")],synergies:[S("nad-plus","mitochondrial support")],clashes:[],bloodMarkerImpact:["mito markers"],foodDrug:[],dosingInfo:"~500 mg/day. Education only.",cautions:["Well tolerated"],cofactor:null,refs:["Singh 2022 (Mitopure)"] },

{ id:"spermidine",name:"Spermidine",category:"supplement",route:"Oral",class:"Autophagy inducer (polyamine)",halfLife:"—",bioavailability:"Oral",reversible:"yes",evidence:"C",
  desc:"Polyamine that induces autophagy — longevity association.",
  targetOrgans:[O("Mitochondria","positive","autophagy"),O("Cardiovascular","positive","epidemiologic"),O("Immune System","positive","immune aging")],synergies:[S("nad-plus","longevity")],clashes:[],bloodMarkerImpact:["—"],foodDrug:[],dosingInfo:"Oral (wheat-germ derived). Education only.",cautions:["Mostly observational"],cofactor:null,refs:["Eisenberg 2016"] },

{ id:"quercetin",name:"Quercetin",category:"supplement",route:"Oral",class:"Flavonoid (senolytic w/ D)",halfLife:"~11–28 h",bioavailability:"Oral (low)",reversible:"yes",evidence:"C",
  desc:"Flavonoid; senolytic when paired with dasatinib (D+Q); anti-inflammatory.",
  targetOrgans:[O("Immune System","positive","anti-inflammatory/senolytic"),O("Cardiovascular","positive","mild BP")],synergies:[S("fisetin","senolytic flavonoids")],clashes:[],bloodMarkerImpact:["inflammatory"],foodDrug:[FD("CYP3A4 drugs","mild inhibition")],dosingInfo:"With bromelain/fat for absorption. Education only.",cautions:["Low bioavailability"],cofactor:null,refs:["D+Q senolytic trials"] },

{ id:"fisetin",name:"Fisetin",category:"supplement",route:"Oral (pulsed)",class:"Senolytic flavonoid",halfLife:"Hours (pulsed)",bioavailability:"Oral (improve w/ fat)",reversible:"yes",evidence:"C",
  desc:"Best-evidenced reversible senolytic — clears senescent cells; pulse, don't run daily.",
  targetOrgans:[O("Immune System","positive","senescent-cell clearance"),O("Mitochondria","positive","antioxidant")],synergies:[S("quercetin","senolytic flavonoids")],clashes:[],bloodMarkerImpact:["inflammatory"],foodDrug:[],dosingInfo:"Pulsed (e.g., 2 days periodically), with fat. Education only.",cautions:["Pulse, not continuous"],cofactor:null,refs:["Mayo Clinic fisetin trials"] },

{ id:"resveratrol",name:"Resveratrol",category:"supplement",route:"Oral",class:"Stilbene / sirtuin activator",halfLife:"~9 h",bioavailability:"Oral (poor)",reversible:"yes",evidence:"C",
  desc:"Sirtuin-activator polyphenol — popular but human benefit is weak/inconsistent.",
  targetOrgans:[O("Cardiovascular","positive","endothelial (mild)"),O("Mitochondria","positive","sirtuins (claimed)")],synergies:[S("nad-plus","sirtuin axis")],clashes:[],bloodMarkerImpact:["mixed"],foodDrug:[FD("Anticoagulants","mild antiplatelet"),FD("CYP substrates","inhibition")],dosingInfo:"With fat. Education only.",cautions:["Poor bioavailability","Weak human data"],cofactor:null,refs:["Mixed RCTs"] },

{ id:"pterostilbene",name:"Pterostilbene",category:"supplement",route:"Oral",class:"Methylated stilbene",halfLife:"~hours",bioavailability:"Oral (better than resveratrol)",reversible:"yes",evidence:"C",
  desc:"More bioavailable resveratrol analog; lipid/antioxidant signals.",
  targetOrgans:[O("Cardiovascular","positive","lipids/antioxidant"),O("Mitochondria","positive","sirtuin-adjacent")],synergies:[S("nad-plus","longevity")],clashes:[],bloodMarkerImpact:["↑ LDL in one trial (watch)"],foodDrug:[],dosingInfo:"Oral. Education only.",cautions:["May raise LDL (one study)"],cofactor:null,refs:["Riche 2014"] },

{ id:"coq10",name:"CoQ10 (Ubiquinol)",category:"supplement",route:"Oral",class:"Mitochondrial cofactor / antioxidant",halfLife:"~33 h",bioavailability:"Oral (ubiquinol better)",reversible:"yes",evidence:"B",
  desc:"Electron-transport cofactor + antioxidant; BP, statin myalgia, heart failure.",
  targetOrgans:[O("Mitochondria","positive","electron transport"),O("Cardiovascular","positive","BP/HF"),O("Skeletal Muscle","positive","statin myalgia")],synergies:[S("atorvastatin","replaces statin-depleted CoQ10")],clashes:[],bloodMarkerImpact:["BP (mild)"],foodDrug:[FD("Warfarin","may reduce INR — monitor"),FD("Statins","statins lower CoQ10")],dosingInfo:"With fat; ubiquinol preferred. Education only.",cautions:["Well tolerated"],cofactor:null,refs:["Q-SYMBIO (HF)"] },

{ id:"pqq",name:"PQQ",category:"supplement",route:"Oral",class:"Mitochondrial biogenesis cofactor",halfLife:"—",bioavailability:"Oral",reversible:"yes",evidence:"C",
  desc:"Promotes mitochondrial biogenesis; pairs with CoQ10.",
  targetOrgans:[O("Mitochondria","positive","biogenesis"),O("Brain / CNS","positive","cognition (small)")],synergies:[S("coq10","mitochondrial pair")],clashes:[],bloodMarkerImpact:["—"],foodDrug:[],dosingInfo:"~10–20 mg. Education only.",cautions:["Limited data"],cofactor:null,refs:["Small human studies"] },

{ id:"ca-akg",name:"Ca-AKG",category:"supplement",route:"Oral",class:"Alpha-ketoglutarate (longevity)",halfLife:"—",bioavailability:"Oral",reversible:"yes",evidence:"C",
  desc:"TCA-cycle metabolite with longevity/epigenetic-age signals (animal + small human).",
  targetOrgans:[O("Mitochondria","positive","TCA/energy"),O("Bone","positive","density (animal)"),O("Immune System","positive","inflammaging")],synergies:[S("nad-plus","longevity stack")],clashes:[],bloodMarkerImpact:["epigenetic age (research)"],foodDrug:[],dosingInfo:"~1–2 g/day. Education only.",cautions:["Early evidence"],cofactor:null,refs:["Demidenko 2021 (TruAge)"] },

{ id:"sulforaphane",name:"Sulforaphane",category:"supplement",route:"Oral",class:"Nrf2 activator",halfLife:"Hours",bioavailability:"Oral (broccoli sprout)",reversible:"yes",evidence:"B",
  desc:"Nrf2 activator — antioxidant/detox enzyme induction, anti-inflammatory.",
  targetOrgans:[O("Liver","positive","phase-II detox/Nrf2"),O("Immune System","positive","anti-inflammatory"),O("Cardiovascular","positive","endothelial")],synergies:[],clashes:[],bloodMarkerImpact:["inflammatory/detox"],foodDrug:[],dosingInfo:"Broccoli-sprout extract w/ myrosinase. Education only.",cautions:["Source/stability matters"],cofactor:null,refs:["Nrf2 trials"] },

/* =============================== SUPPLEMENTS — LIPIDS / LIVER =============================== */
{ id:"omega-3",name:"Omega-3 (EPA/DHA)",category:"supplement",route:"Oral",class:"Long-chain fatty acids",halfLife:"Membrane (weeks)",bioavailability:"Oral with fat",reversible:"yes",evidence:"A",
  desc:"Anti-inflammatory fatty acids — ↓ triglycerides, heart/brain support, ↓ liver fat.",
  targetOrgans:[O("Cardiovascular","positive","↓TG, anti-inflammatory"),O("Brain / CNS","positive","DHA membranes/mood"),O("Liver","positive","↓ hepatic fat")],
  synergies:[S("vitamin-d3","fat-soluble co-absorption")],clashes:[],bloodMarkerImpact:["↓ TG","↑ HDL (mild)","↓ CRP"],foodDrug:[FD("Anticoagulants","bleeding at high dose"),FD("Fatty meal","improves absorption")],dosingInfo:"With a fat meal (esp. ethyl esters). Education only.",cautions:["Bleeding with anticoagulants","Use fresh"],cofactor:null,refs:["REDUCE-IT (EPA)"] },

{ id:"bergamot",name:"Bergamot (BPF)",category:"supplement",route:"Oral",class:"Citrus polyphenol",halfLife:"Hours",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"Lowers LDL/TC and raises HDL; mild glucose benefit.",
  targetOrgans:[O("Cardiovascular","positive","↓LDL, ↑HDL"),O("Liver","positive","lipids")],synergies:[S("omega-3","lipid synergy")],clashes:[],bloodMarkerImpact:["↓ LDL/TC","↑ HDL"],foodDrug:[FD("Statins","additive LDL lowering — fine")],dosingInfo:"Standardized BPF ~38%. Education only.",cautions:["Well tolerated"],cofactor:null,refs:["Bergamot RCTs"] },

{ id:"psyllium",name:"Psyllium Fiber",category:"supplement",route:"Oral",class:"Soluble fiber",halfLife:"—",bioavailability:"Oral (not absorbed)",reversible:"yes",evidence:"A",
  desc:"Soluble fiber — ↓ LDL, blunts post-meal glucose, satiety, gut.",
  targetOrgans:[O("Cardiovascular","positive","↓ LDL"),O("Gut / GI","positive","regularity/microbiome"),O("Pancreas","positive","glucose")],synergies:[],clashes:[],bloodMarkerImpact:["↓ LDL","↓ post-meal glucose"],foodDrug:[FD("Oral meds","binds — space ~2 h apart")],dosingInfo:"With plenty of water. Education only.",cautions:["Space from meds","Choking if dry"],cofactor:null,refs:["Cholesterol meta-analyses"] },

{ id:"red-yeast-rice",name:"Red Yeast Rice",category:"supplement",route:"Oral",class:"Natural monacolin K (statin)",halfLife:"Hours",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"Contains monacolin K (= lovastatin) — lowers LDL but is effectively a statin.",
  targetOrgans:[O("Liver","positive","↓ LDL (HMG-CoA)"),O("Skeletal Muscle","caution","statin myalgia"),O("Cardiovascular","positive","LDL")],synergies:[S("coq10","offset CoQ10 depletion")],clashes:[C("atorvastatin","double statin — myopathy risk")],bloodMarkerImpact:["↓ LDL","↑ CK (myopathy)"],foodDrug:[FD("Grapefruit","↑ statin levels"),FD("CYP3A4 inhibitors","myopathy risk")],dosingInfo:"Variable potency. Education only.",cautions:["It IS a statin","Liver/muscle monitoring"],cofactor:"Add CoQ10.",refs:["Monacolin literature"] },

{ id:"niacin",name:"Niacin (B3)",category:"supplement",route:"Oral",class:"Vitamin B3 (lipid doses)",halfLife:"~hours",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"High-dose niacin raises HDL/lowers TG — but flushing, ↑ glucose, ↑ uric acid.",
  targetOrgans:[O("Cardiovascular","positive","↑HDL, ↓TG"),O("Liver","caution","hepatotoxic (sustained-release)"),O("Pancreas","caution","↑ glucose"),O("Kidneys","caution","↑ uric acid")],synergies:[],clashes:[C("nad-plus","uric-acid/glucose route overlap")],bloodMarkerImpact:["↑ HDL","↓ TG","↑ glucose","↑ uric acid"],foodDrug:[FD("Alcohol","worse flushing/liver")],dosingInfo:"Education only — flushing common.",cautions:["↑ uric acid (gout)","↑ glucose","Hepatotoxic (SR form)"],cofactor:null,refs:["AIM-HIGH/HPS2-THRIVE"] },

{ id:"tudca",name:"TUDCA",category:"supplement",route:"Oral",class:"Bile acid (hepatoprotective)",halfLife:"Hours",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"Bile acid — hepatoprotective, reduces ER stress, supports bile flow.",
  targetOrgans:[O("Liver","positive","hepatoprotective"),O("Gut / GI","positive","bile flow")],synergies:[S("nac","liver, different mechanism")],clashes:[],bloodMarkerImpact:["supports ALT"],foodDrug:[],dosingInfo:"Oral. Education only.",cautions:["Well tolerated"],cofactor:null,refs:["Cholestasis/liver literature"] },

{ id:"milk-thistle",name:"Milk Thistle (Silymarin)",category:"supplement",route:"Oral",class:"Hepatoprotective flavonolignan",halfLife:"~6 h",bioavailability:"Oral (low)",reversible:"yes",evidence:"C",
  desc:"Antioxidant liver support — modest evidence.",
  targetOrgans:[O("Liver","positive","antioxidant/hepatoprotective")],synergies:[S("nac","liver support")],clashes:[],bloodMarkerImpact:["ALT (modest)"],foodDrug:[FD("CYP substrates","mild inhibition")],dosingInfo:"Standardized silymarin. Education only.",cautions:["Modest evidence"],cofactor:null,refs:["Liver RCTs (mixed)"] },

/* =============================== SUPPLEMENTS — NEURO / SLEEP =============================== */
{ id:"nac",name:"NAC",category:"supplement",route:"Oral",class:"Glutathione precursor",halfLife:"~6 h",bioavailability:"Oral (low but effective)",reversible:"yes",evidence:"A",
  desc:"Cysteine donor → glutathione; hepatoprotective + craving/compulsivity data.",
  targetOrgans:[O("Liver","positive","↑ glutathione"),O("Brain / CNS","positive","glutamate/craving"),O("Immune System","positive","antioxidant")],
  synergies:[S("glycine","GlyNAC glutathione")],clashes:[],bloodMarkerImpact:["↑ glutathione","supports ALT"],foodDrug:[FD("Nitroglycerin","additive hypotension")],dosingInfo:"With/without food; pairs with glycine. Education only.",cautions:["Rare GI"],cofactor:"Pair Glycine (GlyNAC).",refs:["Acetaminophen antidote; craving RCTs"] },

{ id:"glycine",name:"Glycine",category:"supplement",route:"Oral (PM)",class:"Amino acid (sleep/glutathione)",halfLife:"Hours",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"Improves sleep quality; glutathione substrate with NAC; collagen building block.",
  targetOrgans:[O("Brain / CNS","positive","sleep onset/quality"),O("Liver","positive","glutathione")],synergies:[S("nac","GlyNAC"),S("magnesium","sleep")],clashes:[],bloodMarkerImpact:["↑ glutathione (w/ NAC)"],foodDrug:[],dosingInfo:"~3 g pre-bed. Education only.",cautions:["Very well tolerated"],cofactor:null,refs:["Sleep RCTs; GlyNAC trials"] },

{ id:"l-theanine",name:"L-Theanine",category:"supplement",route:"Oral",class:"Calming amino acid",halfLife:"~1 h",bioavailability:"Oral (crosses BBB)",reversible:"yes",evidence:"B",
  desc:"Relaxed focus; raises alpha waves and smooths stimulant edge.",
  targetOrgans:[O("Brain / CNS","positive","calm focus")],synergies:[S("caffeine","calm-focus pairing")],clashes:[],bloodMarkerImpact:["subjective"],foodDrug:[FD("Caffeine","synergy — smooths jitter")],dosingInfo:"200–400 mg. Education only.",cautions:["Very well tolerated"],cofactor:null,refs:["Caffeine+theanine RCTs"] },

{ id:"caffeine",name:"Caffeine",category:"supplement",route:"Oral",class:"Adenosine antagonist (stimulant)",halfLife:"~5 h",bioavailability:"Oral",reversible:"yes",evidence:"A",
  desc:"The classic stimulant — alertness, reaction time, power; tolerance + sleep disruption.",
  targetOrgans:[O("Brain / CNS","positive","alertness/reaction time"),O("Cardiovascular","caution","↑ BP/HR"),O("Skeletal Muscle","positive","power/endurance")],
  synergies:[S("l-theanine","calm-focus"),S("alpha-gpc","focus stack")],clashes:[C("bupropion","additive stimulation/anxiety")],bloodMarkerImpact:["↑ BP/HR (transient)"],foodDrug:[FD("CYP1A2 drugs","metabolism altered"),FD("Sleep","disrupts if late")],dosingInfo:"Avoid within ~8 h of sleep. Education only.",cautions:["Sleep disruption","Tolerance/dependence","Anxiety"],cofactor:"Pair L-theanine to smooth.",refs:["Ergogenic meta-analyses"] },

{ id:"alpha-gpc",name:"Alpha-GPC",category:"supplement",route:"Oral",class:"Cholinergic nootropic",halfLife:"Hours",bioavailability:"Oral (high)",reversible:"yes",evidence:"B",
  desc:"Bioavailable choline → acetylcholine; reaction time, focus, power.",
  targetOrgans:[O("Brain / CNS","positive","acetylcholine/reaction time")],synergies:[S("caffeine","focus stack")],clashes:[C("citicoline","redundant choline source")],bloodMarkerImpact:["subjective"],foodDrug:[],dosingInfo:"Daytime, moderate dose. Education only.",cautions:["One study linked high chronic intake to ↑stroke risk — use moderate"],cofactor:null,refs:["Power/cognition RCTs"] },

{ id:"citicoline",name:"Citicoline (CDP-Choline)",category:"supplement",route:"Oral",class:"Cholinergic nootropic",halfLife:"Hours",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"Choline + cytidine → acetylcholine + membranes; attention/processing speed.",
  targetOrgans:[O("Brain / CNS","positive","attention/processing speed")],synergies:[],clashes:[C("alpha-gpc","redundant choline source")],bloodMarkerImpact:["subjective"],foodDrug:[],dosingInfo:"Daytime. Education only.",cautions:["Well tolerated"],cofactor:null,refs:["Cognitive RCTs"] },

{ id:"lions-mane",name:"Lion's Mane",category:"supplement",route:"Oral",class:"NGF-stimulating mushroom",halfLife:"—",bioavailability:"Oral",reversible:"yes",evidence:"C",
  desc:"Stimulates NGF/neurogenesis — memory, clarity, nerve repair (soft evidence).",
  targetOrgans:[O("Brain / CNS","positive","NGF/neurogenesis"),O("Immune System","positive","beta-glucans")],synergies:[S("semax","neurotrophic")],clashes:[],bloodMarkerImpact:["subjective"],foodDrug:[],dosingInfo:"Dual-extract; effects build over weeks. Education only.",cautions:["Soft evidence","Quality varies"],cofactor:null,refs:["Small human studies"] },

{ id:"bacopa",name:"Bacopa Monnieri",category:"supplement",route:"Oral",class:"Adaptogen / memory herb",halfLife:"—",bioavailability:"Oral (with fat)",reversible:"yes",evidence:"B",
  desc:"Memory/learning herb — effect builds over ~8–12 weeks.",
  targetOrgans:[O("Brain / CNS","positive","memory/learning")],synergies:[],clashes:[],bloodMarkerImpact:["subjective"],foodDrug:[],dosingInfo:"Standardized bacosides; slow onset. Education only.",cautions:["GI upset; slow onset"],cofactor:null,refs:["Memory RCTs/meta-analysis"] },

{ id:"l-tyrosine",name:"L-Tyrosine",category:"supplement",route:"Oral",class:"Catecholamine precursor",halfLife:"Hours",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"Dopamine/noradrenaline precursor — helps cognition under acute stress/sleep loss.",
  targetOrgans:[O("Brain / CNS","positive","stress-state cognition"),O("Thyroid","positive","thyroid hormone substrate")],synergies:[S("caffeine","stress cognition")],clashes:[],bloodMarkerImpact:["subjective"],foodDrug:[FD("MAOIs","avoid — hypertensive risk"),FD("Thyroid meds","substrate overlap")],dosingInfo:"Fasted, pre-stress. Education only.",cautions:["Avoid with MAOIs"],cofactor:null,refs:["Stress-cognition studies"] },

{ id:"taurine",name:"Taurine",category:"supplement",route:"Oral",class:"Conditionally-essential amino acid",halfLife:"~1 h",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"Osmolyte/antioxidant — BP, insulin sensitivity, exercise output.",
  targetOrgans:[O("Cardiovascular","positive","↓ BP"),O("Skeletal Muscle","positive","output"),O("Mitochondria","positive","antioxidant"),O("Pancreas","positive","insulin signaling")],synergies:[S("magnesium","calm/metabolic")],clashes:[],bloodMarkerImpact:["↓ BP (mild)"],foodDrug:[],dosingInfo:"1–3 g. Education only.",cautions:["Well tolerated"],cofactor:null,refs:["BP/exercise meta-analyses"] },

{ id:"tmg",name:"TMG (Betaine)",category:"supplement",route:"Oral",class:"Methyl donor (homocysteine)",halfLife:"Hours",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"Methyl donor — lowers homocysteine, supports power output, restores methylation (pairs with NMN).",
  targetOrgans:[O("Liver","positive","methylation/homocysteine"),O("Skeletal Muscle","positive","power output"),O("Cardiovascular","positive","homocysteine")],synergies:[S("nad-plus","restores methyl groups consumed by NAD metabolism")],clashes:[],bloodMarkerImpact:["↓ homocysteine"],foodDrug:[],dosingInfo:"~1–3 g. Education only.",cautions:["May raise LDL at high doses"],cofactor:null,refs:["Betaine homocysteine trials"] },

{ id:"melatonin",name:"Melatonin",category:"supplement",route:"Oral (PM)",class:"Circadian hormone",halfLife:"~30–60 min",bioavailability:"Oral (variable)",reversible:"yes",evidence:"A",
  desc:"Circadian sleep-onset signal + antioxidant; low doses (0.5–3 mg) for timing.",
  targetOrgans:[O("Brain / CNS","positive","sleep onset/circadian"),O("Endocrine","positive","circadian"),O("Immune System","positive","antioxidant")],synergies:[S("glycine","sleep"),S("tart-cherry","melatonin source"),S("dsip","sleep")],clashes:[],bloodMarkerImpact:["high dose → mild glucose blunting"],foodDrug:[FD("Sedatives","additive drowsiness")],dosingInfo:"0.5–3 mg, 30–60 min pre-bed; consistent timing. Education only.",cautions:["Grogginess at high doses","Vivid dreams"],cofactor:null,refs:["Sleep-onset meta-analyses"] },

{ id:"apigenin",name:"Apigenin",category:"supplement",route:"Oral (PM)",class:"Flavonoid (GABAergic)",halfLife:"~hours",bioavailability:"Oral",reversible:"yes",evidence:"C",
  desc:"Chamomile flavonoid — mild calming/sleep; also a CD38 inhibitor (NAD-sparing).",
  targetOrgans:[O("Brain / CNS","positive","calm/sleep"),O("Immune System","positive","CD38/NAD-sparing")],synergies:[S("melatonin","sleep"),S("nad-plus","CD38 inhibition spares NAD")],clashes:[],bloodMarkerImpact:["subjective"],foodDrug:[],dosingInfo:"~50 mg PM. Education only.",cautions:["Soft evidence"],cofactor:null,refs:["Chamomile/CD38 literature"] },

{ id:"tart-cherry",name:"Tart Cherry",category:"supplement",route:"Oral (PM)",class:"Polyphenol (recovery/sleep/urate)",halfLife:"Hours",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"Anti-inflammatory polyphenols + natural melatonin — recovery, sleep, lowers uric acid.",
  targetOrgans:[O("Skeletal Muscle","positive","recovery/DOMS"),O("Kidneys","positive","↓ uric acid"),O("Brain / CNS","positive","sleep (melatonin)")],synergies:[S("melatonin","sleep")],clashes:[],bloodMarkerImpact:["↓ uric acid","↓ CRP"],foodDrug:[],dosingInfo:"Concentrate/extract evening. Education only.",cautions:["Sugar in juice forms"],cofactor:null,refs:["Recovery/uric-acid RCTs"] },

/* =============================== SUPPLEMENTS — VITAMINS / MINERALS / HORMONE SUPPORT =============================== */
{ id:"vitamin-d3",name:"Vitamin D3 + K2",category:"supplement",route:"Oral",class:"Fat-soluble vitamin (hormone)",halfLife:"25-OH-D ~2–3 weeks",bioavailability:"Oral with fat",reversible:"yes",evidence:"A",
  desc:"Hormone-precursor across tissues; K2 routes calcium to bone, not arteries.",
  targetOrgans:[O("Endocrine","positive","VDR / testosterone if low"),O("Immune System","positive","modulation"),O("Bone","positive","calcium/bone"),O("Skeletal Muscle","positive","function")],
  synergies:[S("magnesium","Mg is a D-metabolism cofactor"),S("omega-3","co-absorption"),S("vitamin-k2","calcium routing")],clashes:[],bloodMarkerImpact:["↑ 25-OH-D","calcium (with K2)"],foodDrug:[FD("Fatty meal","improves absorption")],dosingInfo:"With fat; pair K2. Recheck levels. Education only.",cautions:["Hypercalcemia at very high chronic doses"],cofactor:"Pair Magnesium + K2.",refs:["Deficiency-correction literature"] },

{ id:"vitamin-k2",name:"Vitamin K2 (MK-7)",category:"supplement",route:"Oral",class:"Fat-soluble vitamin",halfLife:"~3 days (MK-7)",bioavailability:"Oral with fat",reversible:"yes",evidence:"B",
  desc:"Activates matrix-Gla protein — directs calcium to bone, away from arteries.",
  targetOrgans:[O("Cardiovascular","positive","↓ arterial calcification"),O("Bone","positive","calcium incorporation")],synergies:[S("vitamin-d3","calcium routing")],clashes:[],bloodMarkerImpact:["arterial calcium (long-term)"],foodDrug:[FD("Warfarin","K2 antagonizes warfarin — avoid/monitor INR")],dosingInfo:"~100–200 mcg MK-7 with D3. Education only.",cautions:["Avoid with warfarin"],cofactor:null,refs:["Rotterdam; arterial calcification"] },

{ id:"vitamin-c",name:"Vitamin C",category:"supplement",route:"Oral / IV",class:"Antioxidant vitamin",halfLife:"~hours",bioavailability:"Oral (saturable)",reversible:"yes",evidence:"B",
  desc:"Antioxidant + collagen cofactor + immune support.",
  targetOrgans:[O("Immune System","positive","immune/antioxidant"),O("Skin / Connective","positive","collagen cofactor")],synergies:[S("collagen","collagen synthesis cofactor")],clashes:[],bloodMarkerImpact:["—"],foodDrug:[FD("Iron","enhances iron absorption")],dosingInfo:"Divided doses. Education only.",cautions:["GI at high dose","Oxalate (kidney stones) in susceptible"],cofactor:null,refs:["Immune/collagen literature"] },

{ id:"vitamin-b12",name:"Vitamin B12",category:"supplement",route:"Oral / SubQ",class:"Methylation / nerve vitamin",halfLife:"Body-pool",bioavailability:"Oral / injectable",reversible:"yes",evidence:"A",
  desc:"Methylation + nerve + red-cell cofactor; injectable for deficiency/absorption issues.",
  targetOrgans:[O("Brain / CNS","positive","nerve/methylation"),O("Immune System","positive","red cells")],synergies:[],clashes:[],bloodMarkerImpact:["↑ B12"],foodDrug:[FD("Metformin","metformin depletes B12")],dosingInfo:"Oral or injectable. Education only.",cautions:["Mostly useful if low"],cofactor:null,refs:["Deficiency literature"] },

{ id:"zinc",name:"Zinc",category:"supplement",route:"Oral",class:"Essential mineral",halfLife:"Body-pool",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"Immune + testosterone cofactor; balances against copper.",
  targetOrgans:[O("Immune System","positive","immune"),O("Endocrine","positive","testosterone (if low)"),O("Prostate / Repro","positive","sperm/T")],synergies:[S("vitamin-d3","hormonal support")],clashes:[C("ghk-cu","copper:zinc balance")],bloodMarkerImpact:["↑ zinc","↓ copper (excess)"],foodDrug:[FD("Antibiotics (tetracyclines/quinolones)","binds — separate")],dosingInfo:"~15–30 mg; balance with copper if chronic. Education only.",cautions:["Excess depletes copper","GI on empty stomach"],cofactor:"Balance with copper if chronic.",refs:["Zinc/T literature"] },

{ id:"boron",name:"Boron",category:"supplement",route:"Oral",class:"Trace mineral (free-T)",halfLife:"Hours",bioavailability:"Oral",reversible:"yes",evidence:"C",
  desc:"Lowers SHBG → raises free testosterone; anti-inflammatory.",
  targetOrgans:[O("Endocrine","positive","↑ free T (↓SHBG)"),O("Bone","positive","mineral metabolism")],synergies:[S("tongkat-ali","free-T support"),S("zinc","T cofactors")],clashes:[],bloodMarkerImpact:["↑ free T","↓ SHBG"],foodDrug:[],dosingInfo:"~6–10 mg/day; cheap. Education only.",cautions:["Modest effect"],cofactor:null,refs:["Naghii 2011"] },

{ id:"collagen",name:"Collagen Peptides",category:"supplement",route:"Oral",class:"Hydrolyzed collagen",halfLife:"—",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"Skin elasticity + joint/connective support; pairs with vitamin C.",
  targetOrgans:[O("Skin / Connective","positive","elasticity/joints"),O("Bone","positive","density (some)")],synergies:[S("vitamin-c","collagen synthesis cofactor")],clashes:[],bloodMarkerImpact:["skin elasticity (research)"],foodDrug:[],dosingInfo:"~10–15 g/day with vitamin C. Education only.",cautions:["Effects build over weeks"],cofactor:"Pair vitamin C.",refs:["Skin-elasticity RCTs"] },

{ id:"curcumin",name:"Curcumin",category:"supplement",route:"Oral",class:"Anti-inflammatory polyphenol",halfLife:"Hours",bioavailability:"Oral (poor; needs piperine/lipid)",reversible:"yes",evidence:"B",
  desc:"Anti-inflammatory turmeric polyphenol — joints, inflammation.",
  targetOrgans:[O("Immune System","positive","anti-inflammatory"),O("Skin / Connective","positive","joints"),O("Liver","positive","antioxidant")],synergies:[],clashes:[],bloodMarkerImpact:["↓ CRP"],foodDrug:[FD("Anticoagulants","mild antiplatelet"),FD("CYP substrates","inhibition")],dosingInfo:"With piperine/lipid for absorption. Education only.",cautions:["Poor bioavailability","Antiplatelet at high dose"],cofactor:null,refs:["Inflammation/joint RCTs"] },

{ id:"boswellia",name:"Boswellia",category:"supplement",route:"Oral",class:"5-LOX anti-inflammatory",halfLife:"Hours",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"5-lipoxygenase inhibitor — joint/inflammation, complements curcumin.",
  targetOrgans:[O("Skin / Connective","positive","joints"),O("Immune System","positive","anti-inflammatory (5-LOX)")],synergies:[S("curcumin","anti-inflammatory pair")],clashes:[],bloodMarkerImpact:["inflammatory"],foodDrug:[],dosingInfo:"Standardized AKBA. Education only.",cautions:["GI"],cofactor:null,refs:["Osteoarthritis RCTs"] },

{ id:"ashwagandha",name:"Ashwagandha",category:"supplement",route:"Oral",class:"Adaptogen",halfLife:"Hours",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"Adaptogen — stress/cortisol ↓, sleep, modest testosterone; rare liver-injury reports.",
  targetOrgans:[O("Endocrine","positive","↓ cortisol, ?↑T"),O("Brain / CNS","positive","stress/sleep"),O("Thyroid","caution","may raise thyroid hormones"),O("Liver","caution","idiosyncratic hepatotoxicity (rare)")],synergies:[],clashes:[],bloodMarkerImpact:["↓ cortisol","↑ testosterone (modest)","ALT (rare)"],foodDrug:[FD("Sedatives","additive"),FD("Thyroid meds","may push thyroid up")],dosingInfo:"Standardized KSM-66/Sensoril. Education only.",cautions:["Rare liver injury — watch ALT","Avoid in hyperthyroid/autoimmune"],cofactor:null,refs:["Stress/T RCTs"] },

{ id:"rhodiola",name:"Rhodiola Rosea",category:"supplement",route:"Oral",class:"Adaptogen (anti-fatigue)",halfLife:"Hours",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"Anti-fatigue adaptogen — mental performance under stress.",
  targetOrgans:[O("Brain / CNS","positive","fatigue/stress performance"),O("Endocrine","positive","stress axis")],synergies:[],clashes:[],bloodMarkerImpact:["subjective"],foodDrug:[],dosingInfo:"Standardized rosavins/salidroside, AM. Education only.",cautions:["Stimulating for some"],cofactor:null,refs:["Fatigue RCTs"] },

{ id:"tongkat-ali",name:"Tongkat Ali",category:"supplement",route:"Oral",class:"Botanical (testosterone)",halfLife:"Hours",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"Herb that may raise free testosterone (↓SHBG) + reduce stress.",
  targetOrgans:[O("Endocrine","positive","↑ free testosterone (modest)"),O("Brain / CNS","positive","stress/cortisol"),O("Prostate / Repro","positive","libido")],synergies:[S("boron","free-T support"),S("zinc","T cofactors")],clashes:[],bloodMarkerImpact:["↑ free T (modest)","↓ cortisol"],foodDrug:[],dosingInfo:"Standardized extract (eurycomanone %). Education only.",cautions:["Quality-dependent","Modest effect"],cofactor:null,refs:["T/stress RCTs"] },

{ id:"creatine",name:"Creatine Monohydrate",category:"supplement",route:"Oral",class:"Phosphagen / ergogenic",halfLife:"~3 h (weeks to saturate)",bioavailability:"Oral (near-complete)",reversible:"yes",evidence:"A",
  desc:"Most-evidenced ergogenic — strength, lean-mass retention, cognition (esp. sleep-deprived).",
  targetOrgans:[O("Skeletal Muscle","positive","ATP/strength/fullness"),O("Brain / CNS","positive","energy buffering/cognition"),O("Mitochondria","positive","ATP")],synergies:[],clashes:[],bloodMarkerImpact:["↑ creatinine (assay artifact — not injury)"],foodDrug:[],dosingInfo:"3–5 g/day; consistency > timing. Education only.",cautions:["Interpret creatinine with creatine use in mind"],cofactor:null,refs:["Hundreds of RCTs / meta-analyses"] },

{ id:"magnesium",name:"Magnesium (Glycinate)",category:"supplement",route:"Oral (PM)",class:"Essential mineral",halfLife:"Body-pool",bioavailability:"Oral (glycinate gentle)",reversible:"yes",evidence:"A",
  desc:"Cofactor for 300+ enzymes — glucose, sleep, neuromuscular, BP, seizure threshold.",
  targetOrgans:[O("Brain / CNS","positive","calm/sleep/seizure threshold"),O("Skeletal Muscle","positive","cramps/function"),O("Cardiovascular","positive","mild ↓BP"),O("Endocrine","positive","insulin signaling")],synergies:[S("vitamin-d3","D-metabolism cofactor"),S("glycine","sleep"),S("taurine","calm/metabolic")],clashes:[],bloodMarkerImpact:["serum Mg","glucose/BP support"],foodDrug:[FD("Antibiotics/thyroid","binds — space ~2 h")],dosingInfo:"Evening; glycinate gentle. Education only.",cautions:["Caution in severe renal impairment"],cofactor:null,refs:["Repletion / sleep / glucose RCTs"] },

/* =============================== ORAL / Rx / OTHERS =============================== */
{ id:"bupropion",name:"Bupropion (NDRI)",category:"oral",route:"Oral (Rx)",class:"Norepinephrine-dopamine reuptake inhibitor",halfLife:"~21 h (+ metabolites)",bioavailability:"Oral (XL steady)",reversible:"yes",evidence:"A",
  desc:"Activating antidepressant — focus/mood/drive, weight-neutral, aids smoking cessation.",
  targetOrgans:[O("Brain / CNS","positive","↑ dopamine/NE; ↓ seizure threshold"),O("Cardiovascular","caution","↑ BP/HR"),O("Liver","caution","rare hepatotoxicity")],
  synergies:[S("nac","craving/cessation support")],clashes:[C("retatrutide","appetite↓ + dehydration lowers seizure threshold"),C("caffeine","additive stimulation")],
  bloodMarkerImpact:["↑ BP/HR","ALT (rare)"],foodDrug:[FD("MAOIs","hypertensive crisis — contraindicated"),FD("Tramadol","additive seizure risk"),FD("Alcohol (withdrawal)","seizure risk")],dosingInfo:"Swallow XL whole. Prescriber-directed.",cautions:["Lowers seizure threshold","Strong CYP2D6 inhibitor","Boxed warning (young adults)"],cofactor:"Keep electrolytes/Mg + food/hydration.",refs:["FDA label; smoking-cessation RCTs"] },

{ id:"sertraline",name:"Sertraline (SSRI)",category:"oral",route:"Oral (Rx)",class:"Selective serotonin reuptake inhibitor",halfLife:"~26 h",bioavailability:"Oral",reversible:"caution",evidence:"A",
  desc:"First-line SSRI for depression/anxiety; discontinuation needs tapering.",
  targetOrgans:[O("Brain / CNS","positive","mood/anxiety"),O("Gut / GI","caution","GI/nausea"),O("Prostate / Repro","caution","sexual dysfunction")],synergies:[],clashes:[C("bupropion","CYP2D6 + additive — combined under MD only")],bloodMarkerImpact:["↓ sodium (rare SIADH)"],foodDrug:[FD("MAOIs","serotonin syndrome — contraindicated"),FD("NSAIDs","bleeding risk"),FD("Triptans/tramadol","serotonin syndrome")],dosingInfo:"Prescriber-directed; taper to stop.",cautions:["Serotonin syndrome risk","Sexual side effects","Discontinuation syndrome"],cofactor:null,refs:["FDA label"] },

{ id:"modafinil",name:"Modafinil",category:"oral",route:"Oral (Rx)",class:"Wakefulness-promoting agent",halfLife:"~12–15 h",bioavailability:"Oral",reversible:"yes",evidence:"A",
  desc:"Wakefulness agent — alertness/focus with less crash than stimulants.",
  targetOrgans:[O("Brain / CNS","positive","wakefulness/focus"),O("Cardiovascular","caution","mild ↑ BP/HR")],synergies:[],clashes:[C("caffeine","additive overstimulation")],bloodMarkerImpact:["mild ↑BP/HR"],foodDrug:[FD("Hormonal contraceptives","reduces efficacy (CYP3A4 induction)"),FD("CYP substrates","induction")],dosingInfo:"AM. Prescriber-directed.",cautions:["Reduces contraceptive efficacy","Rare serious rash (SJS)","Sleep disruption if late"],cofactor:null,refs:["Narcolepsy/SWSD trials"] },

{ id:"low-dose-naltrexone",name:"Low-Dose Naltrexone (LDN)",category:"oral",route:"Oral (Rx)",class:"Opioid antagonist (low dose)",halfLife:"~4 h",bioavailability:"Oral",reversible:"yes",evidence:"C",
  desc:"Low-dose naltrexone — off-label immune/anti-inflammatory + pain/autoimmune use.",
  targetOrgans:[O("Immune System","positive","anti-inflammatory (microglia)"),O("Brain / CNS","positive","pain/mood")],synergies:[],clashes:[],bloodMarkerImpact:["inflammatory"],foodDrug:[FD("Opioids","blocks opioid analgesia — avoid")],dosingInfo:"~1.5–4.5 mg PM. Prescriber-directed.",cautions:["Blocks opioid painkillers","Vivid dreams"],cofactor:null,refs:["Fibromyalgia/Crohn's pilots"] },

{ id:"tadalafil",name:"Tadalafil",category:"oral",route:"Oral (Rx)",class:"PDE5 inhibitor",halfLife:"~17.5 h",bioavailability:"Oral",reversible:"yes",evidence:"A",
  desc:"Long-acting vasodilator — erectile function, blood flow, pumps, BPH/endothelial.",
  targetOrgans:[O("Cardiovascular","positive","vasodilation/endothelial"),O("Prostate / Repro","positive","ED/BPH"),O("Skeletal Muscle","positive","blood flow/pump")],synergies:[],clashes:[],bloodMarkerImpact:["↓ BP (mild)"],foodDrug:[FD("Nitrates","DANGEROUS hypotension — contraindicated"),FD("Alpha-blockers","additive ↓BP"),FD("Grapefruit","↑ levels")],dosingInfo:"Low daily or as-needed. Prescriber-directed.",cautions:["CONTRAINDICATED with nitrates","Caution with alpha-blockers"],cofactor:null,refs:["FDA label"] },

{ id:"sildenafil",name:"Sildenafil",category:"oral",route:"Oral (Rx)",class:"PDE5 inhibitor (short)",halfLife:"~4 h",bioavailability:"Oral",reversible:"yes",evidence:"A",
  desc:"Short-acting PDE5 inhibitor (Viagra) — on-demand vasodilation.",
  targetOrgans:[O("Cardiovascular","positive","vasodilation"),O("Prostate / Repro","positive","ED")],synergies:[],clashes:[],bloodMarkerImpact:["↓ BP (mild)"],foodDrug:[FD("Nitrates","DANGEROUS hypotension — contraindicated"),FD("Fatty meal","delays onset")],dosingInfo:"On-demand. Prescriber-directed.",cautions:["Contraindicated with nitrates","Visual blue-tint at high dose"],cofactor:null,refs:["FDA label"] },

{ id:"finasteride",name:"Finasteride",category:"oral",route:"Oral (Rx)",class:"5-alpha-reductase inhibitor",halfLife:"~5–6 h",bioavailability:"Oral",reversible:"caution",evidence:"A",
  desc:"Blocks DHT — hair loss/BPH; sexual side effects + post-finasteride syndrome reports.",
  targetOrgans:[O("Skin / Connective","positive","scalp hair (↓DHT)"),O("Prostate / Repro","caution","sexual side effects"),O("Endocrine","caution","↓DHT, ↑testosterone")],synergies:[],clashes:[C("testosterone","may blunt some androgenic effect")],bloodMarkerImpact:["↓ DHT","↓ PSA (~50% — adjust screening)"],foodDrug:[],dosingInfo:"1 mg (hair)/5 mg (BPH). Prescriber-directed.",cautions:["Sexual side effects","Post-finasteride syndrome reports","Halves PSA"],cofactor:null,refs:["FDA label"] },

{ id:"enclomiphene",name:"Enclomiphene",category:"oral",route:"Oral (Rx)",class:"SERM (HPG stimulant)",halfLife:"~10 h",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"SERM that raises endogenous testosterone via LH/FSH — the reversible alternative to TRT.",
  targetOrgans:[O("Endocrine","positive","↑ LH/FSH → testosterone"),O("Prostate / Repro","positive","preserves fertility")],synergies:[S("hcg","HPG support"),S("tongkat-ali","T support")],clashes:[C("testosterone","TRT suppresses the axis enclomiphene stimulates")],bloodMarkerImpact:["↑ testosterone","↑ LH/FSH","↑ estradiol (watch)"],foodDrug:[],dosingInfo:"Low daily/EOD. Prescriber-directed.",cautions:["Estradiol rise","Mood/visual (rare)"],cofactor:"Monitor estradiol.",refs:["Secondary hypogonadism trials"] },

{ id:"anastrozole",name:"Anastrozole",category:"oral",route:"Oral (Rx)",class:"Aromatase inhibitor",halfLife:"~50 h",bioavailability:"Oral",reversible:"yes",evidence:"A",
  desc:"Lowers estradiol by blocking aromatase — used to manage high E2 on TRT/AAS.",
  targetOrgans:[O("Endocrine","caution","↓ estradiol (over-suppression risk)"),O("Bone","negative","low E2 harms bone density"),O("Cardiovascular","caution","low E2 worsens lipids")],synergies:[S("testosterone","manage aromatization")],clashes:[],bloodMarkerImpact:["↓ estradiol","↓ HDL (if over-suppressed)","↓ bone density (chronic)"],foodDrug:[],dosingInfo:"Micro-dosed if used. Prescriber-directed.",cautions:["Crashing E2 harms libido/joints/bone/lipids","Use sparingly"],cofactor:"Don't over-suppress estradiol.",refs:["AI literature"] },

{ id:"testosterone",name:"Testosterone (TRT)",category:"oral",route:"IM / SubQ / gel",class:"Androgen (Rx)",halfLife:"Ester-dependent",bioavailability:"Injectable/transdermal",reversible:"caution",evidence:"A",
  desc:"Exogenous testosterone — builds muscle/libido/mood, but suppresses natural production (often lifelong).",
  targetOrgans:[O("Skeletal Muscle","positive","lean mass/strength"),O("Brain / CNS","positive","libido/mood"),O("Endocrine","negative","suppresses HPTA (often permanent)"),O("Cardiovascular","caution","↑ hematocrit; lipid shifts"),O("Prostate / Repro","caution","testicular atrophy/fertility ↓")],synergies:[S("hcg","preserves testes/fertility"),S("anastrozole","manage estradiol")],clashes:[C("enclomiphene","TRT suppresses the axis SERMs stimulate")],bloodMarkerImpact:["↑ testosterone","↑ hematocrit","↓ HDL","↓ LH/FSH","↑ estradiol"],foodDrug:[],dosingInfo:"Clinician-supervised, lab-monitored.",cautions:["HPTA shutdown (often lifelong)","Polycythemia","Fertility ↓","Lifelong commitment"],cofactor:"Monitor hematocrit, estradiol, PSA, lipids.",refs:["Endocrine Society guidelines"] },

{ id:"oxandrolone",name:"Oxandrolone (oral anabolic)",category:"oral",route:"Oral (17-aa)",class:"Oral anabolic-androgenic steroid",halfLife:"~9 h",bioavailability:"Oral (17-aa)",reversible:"no",evidence:"A",
  desc:"Oral 'performance tablet' — builds lean mass/strength with IRREVERSIBLE and serious risks.",
  targetOrgans:[O("Skeletal Muscle","positive","lean/strength/hardness"),O("Liver","negative","hepatotoxic (17-aa)"),O("Cardiovascular","negative","↓ HDL sharply"),O("Endocrine","negative","suppresses natural T (HPTA)")],synergies:[],clashes:[],bloodMarkerImpact:["↓ HDL","↑ ALT/AST","↓ endogenous T/LH"],foodDrug:[FD("Alcohol","compounded liver stress"),FD("Warfarin","potentiates — bleeding")],dosingInfo:"Education only — demonstrates organ-stress/warning logic. Clinician-only.",cautions:["HPTA shutdown (can need lifelong TRT)","Hepatotoxic","Tanks HDL","Not reversible-friendly"],cofactor:"Full lipid/liver/hormone monitoring + recovery — clinician-only.",refs:["AAS literature"] },

{ id:"trenbolone",name:"Trenbolone (anabolic)",category:"oral",route:"IM",class:"Potent anabolic-androgenic steroid",halfLife:"Ester-dependent",bioavailability:"Injectable",reversible:"no",evidence:"C",
  desc:"Very potent anabolic — strong muscle/strength but harsh sides; high-risk.",
  targetOrgans:[O("Skeletal Muscle","positive","strong lean/strength"),O("Cardiovascular","negative","tanks HDL, ↑BP"),O("Brain / CNS","negative","aggression/anxiety/insomnia"),O("Endocrine","negative","HPTA shutdown; ↑prolactin"),O("Kidneys","caution","strain")],synergies:[],clashes:[],bloodMarkerImpact:["↓ HDL","↓ LH/T","↑ prolactin"],foodDrug:[],dosingInfo:"Education only — high-risk, clinician/lab territory.",cautions:["Harsh CNS/cardio sides","HPTA shutdown (irreversible risk)","Night sweats, insomnia"],cofactor:null,refs:["AAS literature"] },

{ id:"nandrolone",name:"Nandrolone (anabolic)",category:"oral",route:"IM",class:"Anabolic-androgenic steroid",halfLife:"Ester-dependent",bioavailability:"Injectable",reversible:"no",evidence:"C",
  desc:"Anabolic with joint-relief reputation; long suppression + prolactin/mood risks.",
  targetOrgans:[O("Skeletal Muscle","positive","lean/strength"),O("Skin / Connective","positive","joint comfort"),O("Endocrine","negative","strong/long HPTA suppression; prolactin"),O("Cardiovascular","negative","↓ HDL"),O("Prostate / Repro","negative","'deca dick'/libido")],synergies:[],clashes:[],bloodMarkerImpact:["↓ HDL","↓ LH/T","↑ prolactin"],foodDrug:[],dosingInfo:"Education only — clinician/lab territory.",cautions:["Long HPTA suppression (irreversible risk)","Prolactin/sexual sides"],cofactor:null,refs:["AAS literature"] },

{ id:"stanozolol",name:"Stanozolol (Winstrol)",category:"oral",route:"Oral / IM",class:"Oral anabolic-androgenic steroid",halfLife:"~9 h (oral)",bioavailability:"Oral (17-aa)",reversible:"no",evidence:"C",
  desc:"Drying oral anabolic — but very hard on lipids, liver, and joints.",
  targetOrgans:[O("Skeletal Muscle","positive","hardness/strength"),O("Liver","negative","hepatotoxic"),O("Cardiovascular","negative","crashes HDL hard"),O("Skin / Connective","negative","dry/brittle joints"),O("Endocrine","negative","HPTA shutdown")],synergies:[],clashes:[],bloodMarkerImpact:["↓↓ HDL","↑ ALT","↓ T/LH"],foodDrug:[],dosingInfo:"Education only — clinician territory.",cautions:["Severe lipid hit","Hepatotoxic","Joint dryness/injury","HPTA shutdown"],cofactor:null,refs:["AAS literature"] },

{ id:"clenbuterol",name:"Clenbuterol",category:"oral",route:"Oral",class:"Beta-2 agonist (cutting)",halfLife:"~36 h",bioavailability:"Oral",reversible:"caution",evidence:"C",
  desc:"Beta-2 agonist used for fat loss — strong cardiac/CNS stimulation; not a benign cutter.",
  targetOrgans:[O("Adipose Tissue","positive","thermogenesis/lipolysis"),O("Cardiovascular","negative","tachycardia, arrhythmia, cardiac hypertrophy"),O("Skeletal Muscle","caution","cramps (taurine/electrolyte loss)"),O("Brain / CNS","caution","jitters/anxiety/insomnia")],synergies:[],clashes:[C("caffeine","additive cardiac stimulation"),C("t3-liothyronine","additive cardiac/metabolic strain")],bloodMarkerImpact:["↑ HR","↓ potassium/taurine"],foodDrug:[FD("Stimulants","dangerous cardiac additivity")],dosingInfo:"Education only — cardiac-risk drug.",cautions:["Tachyarrhythmia","Cardiac hypertrophy","Cramps/electrolytes"],cofactor:"Taurine + electrolytes for cramps.",refs:["Beta-agonist literature"] },

{ id:"t3-liothyronine",name:"T3 (Liothyronine)",category:"oral",route:"Oral (Rx)",class:"Active thyroid hormone",halfLife:"~1 day",bioavailability:"Oral",reversible:"caution",evidence:"A",
  desc:"Active thyroid hormone — raises metabolic rate; suppresses natural thyroid output.",
  targetOrgans:[O("Thyroid","negative","suppresses endogenous output"),O("Adipose Tissue","positive","↑ metabolic rate"),O("Cardiovascular","negative","tachycardia/arrhythmia"),O("Skeletal Muscle","caution","catabolism if over-dosed")],synergies:[],clashes:[C("clenbuterol","additive cardiac/metabolic strain")],bloodMarkerImpact:["↓ TSH","↑ HR","↓ T4 (suppressed)"],foodDrug:[FD("Calcium/iron","reduce absorption — separate")],dosingInfo:"Prescriber-directed; lab-monitored.",cautions:["Cardiac strain","Muscle loss if over-dosed","Suppresses thyroid axis"],cofactor:null,refs:["FDA label"] },

{ id:"rapamycin",name:"Rapamycin (Sirolimus)",category:"oral",route:"Oral (Rx)",class:"mTOR inhibitor",halfLife:"~62 h",bioavailability:"Oral",reversible:"caution",evidence:"B",
  desc:"mTOR inhibitor + longevity-research frontrunner — usually pulsed weekly off-label.",
  targetOrgans:[O("Immune System","caution","immunomodulation (dose-dependent)"),O("Mitochondria","positive","autophagy"),O("Skeletal Muscle","caution","blunts mTOR/hypertrophy if mistimed"),O("Pancreas","caution","glucose/lipids (chronic high dose)")],synergies:[],clashes:[C("testosterone","mTOR inhibition can blunt muscle anabolism")],bloodMarkerImpact:["lipids/glucose (chronic)","immune markers"],foodDrug:[FD("Grapefruit","↑ levels (CYP3A4)"),FD("CYP3A4 inhibitors","↑ levels — dangerous")],dosingInfo:"Weekly pulsed off-label for longevity. Prescriber-directed.",cautions:["Immunosuppression at high/continuous dose","Mouth sores","Time away from training for muscle"],cofactor:null,refs:["PEARL trial; mTOR/aging literature"] },

{ id:"acarbose",name:"Acarbose",category:"oral",route:"Oral (Rx)",class:"Alpha-glucosidase inhibitor",halfLife:"~2 h",bioavailability:"Oral (gut-local)",reversible:"yes",evidence:"A",
  desc:"Blunts post-meal glucose by slowing carb digestion; longevity interest (mouse).",
  targetOrgans:[O("Gut / GI","caution","gas/bloating (fermented carbs)"),O("Pancreas","positive","↓ post-meal glucose")],synergies:[],clashes:[],bloodMarkerImpact:["↓ post-meal glucose","↓ HbA1c (modest)"],foodDrug:[FD("High-carb meals","more GI gas")],dosingInfo:"With first bite of carbs. Prescriber-directed.",cautions:["GI gas/bloating"],cofactor:null,refs:["ITP mouse longevity; STOP-NIDDM"] },

{ id:"empagliflozin",name:"Empagliflozin (SGLT2)",category:"oral",route:"Oral (Rx)",class:"SGLT2 inhibitor",halfLife:"~12 h",bioavailability:"Oral",reversible:"yes",evidence:"A",
  desc:"Excretes glucose via urine — strong heart/kidney protection; longevity interest.",
  targetOrgans:[O("Kidneys","positive","renal protection"),O("Cardiovascular","positive","heart-failure benefit"),O("Pancreas","positive","↓ glucose"),O("Prostate / Repro","caution","genital infections")],synergies:[],clashes:[],bloodMarkerImpact:["↓ glucose/HbA1c","↓ weight/BP","mild ↑ ketones"],foodDrug:[FD("Diuretics","additive volume loss")],dosingInfo:"Prescriber-directed.",cautions:["Genital/UTI infections","Euglycemic DKA (rare)","Volume depletion"],cofactor:null,refs:["EMPA-REG; EMPEROR"] },

{ id:"atorvastatin",name:"Atorvastatin (statin)",category:"oral",route:"Oral (Rx)",class:"HMG-CoA reductase inhibitor",halfLife:"~14 h (active ~20–30)",bioavailability:"Oral",reversible:"yes",evidence:"A",
  desc:"Statin — lowers LDL/ApoB, strong CV-event reduction.",
  targetOrgans:[O("Liver","positive","↓ LDL synthesis"),O("Cardiovascular","positive","↓ ApoB, CV events"),O("Skeletal Muscle","caution","myalgia (uncommon)")],synergies:[S("coq10","offset CoQ10 depletion"),S("ezetimibe","additive LDL lowering")],clashes:[C("red-yeast-rice","double statin — myopathy")],bloodMarkerImpact:["↓ LDL/ApoB","↑ ALT (mild)","↑ CK (myopathy, rare)"],foodDrug:[FD("Grapefruit","↑ statin levels — myopathy risk"),FD("CYP3A4 inhibitors","↑ levels")],dosingInfo:"Prescriber-directed.",cautions:["Myalgia","Liver enzymes","Grapefruit interaction"],cofactor:"Consider CoQ10 for myalgia.",refs:["Statin meta-analyses (CTT)"] },

{ id:"ezetimibe",name:"Ezetimibe",category:"oral",route:"Oral (Rx)",class:"Cholesterol-absorption inhibitor",halfLife:"~22 h",bioavailability:"Oral",reversible:"yes",evidence:"A",
  desc:"Blocks gut cholesterol absorption — adds to statin LDL lowering.",
  targetOrgans:[O("Gut / GI","positive","↓ cholesterol absorption"),O("Cardiovascular","positive","↓ LDL/ApoB")],synergies:[S("atorvastatin","additive LDL lowering")],clashes:[],bloodMarkerImpact:["↓ LDL/ApoB"],foodDrug:[],dosingInfo:"Prescriber-directed.",cautions:["Well tolerated"],cofactor:null,refs:["IMPROVE-IT"] },

{ id:"nicotine",name:"Nicotine",category:"oral",route:"Pouch / gum / patch",class:"Nicotinic acetylcholine agonist",halfLife:"~2 h",bioavailability:"Buccal/transdermal",reversible:"caution",evidence:"B",
  desc:"Stimulant nootropic (focus/appetite) — but addictive, raises HR/BP, vasoconstricts.",
  targetOrgans:[O("Brain / CNS","positive","focus/attention (acute)"),O("Cardiovascular","negative","↑ HR/BP, vasoconstriction"),O("Adipose Tissue","positive","appetite suppression")],synergies:[],clashes:[],bloodMarkerImpact:["↑ HR/BP"],foodDrug:[FD("Caffeine","additive stimulation/anxiety")],dosingInfo:"Non-combusted forms; education only.",cautions:["Addictive","↑ HR/BP, vasoconstriction","Dependence"],cofactor:null,refs:["Cognition/cessation literature"] },

/* =============================== PEPTIDES — HORMONAL / REPRO (added) =============================== */
{ id:"gonadorelin",name:"Gonadorelin",category:"peptide",route:"SubQ (pulsatile)",class:"GnRH analog (HPG)",halfLife:"~minutes",bioavailability:"Subcutaneous",reversible:"yes",evidence:"B",
  desc:"Synthetic GnRH — pulses stimulate LH/FSH to preserve testicular function & fertility on TRT; requires pulsatile dosing.",
  targetOrgans:[O("Endocrine","positive","↑ LH/FSH → testosterone"),O("Prostate / Repro","positive","fertility / testes size")],
  synergies:[S("hcg","HPG support"),S("enclomiphene","HPTA stimulation")],clashes:[C("testosterone","TRT suppresses the GnRH axis gonadorelin drives")],
  bloodMarkerImpact:["↑ LH/FSH","↑ testosterone"],foodDrug:[],dosingInfo:"Pulsatile SubQ; continuous dosing desensitizes the axis. Prescriber-directed.",cautions:["Desensitization if not pulsatile","Very short half-life"],cofactor:null,refs:["GnRH clinical pharmacology"] },

{ id:"triptorelin",name:"Triptorelin",category:"peptide",route:"IM (depot)",class:"GnRH agonist (Rx depot)",halfLife:"Depot (weeks)",bioavailability:"IM depot",reversible:"caution",evidence:"B",
  desc:"Long-acting GnRH agonist — after an initial flare it shuts down LH/FSH (prostate cancer, endometriosis); a single dose suppresses for weeks.",
  targetOrgans:[O("Endocrine","negative","sustained HPG suppression"),O("Prostate / Repro","caution","testosterone shutdown"),O("Bone","caution","low-sex-hormone bone loss (chronic)")],
  synergies:[],clashes:[C("testosterone","opposing HPG signals"),C("gonadorelin","opposing GnRH strategy")],bloodMarkerImpact:["↓ LH/FSH","↓ testosterone (after flare)"],foodDrug:[],dosingInfo:"Depot IM; clinician-only.",cautions:["Initial testosterone flare","Prolonged suppression","Bone density (chronic)"],cofactor:null,refs:["GnRH-agonist labels"] },

/* =============================== PEPTIDES — INCRETIN / METABOLIC (added) =============================== */
{ id:"pramlintide",name:"Pramlintide",category:"peptide",route:"SubQ (with meals)",class:"Amylin analog (approved)",halfLife:"~48 min",bioavailability:"Subcutaneous",reversible:"yes",evidence:"A",
  desc:"Short-acting amylin analog (Symlin) — slows gastric emptying, blunts post-meal glucose & appetite; used alongside insulin.",
  targetOrgans:[O("Pancreas","positive","post-meal glucose"),O("Brain / CNS","positive","satiety"),O("Gut / GI","caution","nausea, slowed emptying")],
  synergies:[S("insulin","mealtime glucose control — reduce insulin dose")],clashes:[],
  bloodMarkerImpact:["↓ post-meal glucose","↓ weight"],foodDrug:[FD("Insulin","additive hypoglycemia — dose reduction needed")],dosingInfo:"SubQ before meals, separate from insulin. Prescriber-directed.",cautions:["Hypoglycemia with insulin","Nausea"],cofactor:null,refs:["Symlin FDA label"] },

{ id:"insulin",name:"Insulin (exogenous)",category:"peptide",route:"SubQ",class:"Anabolic peptide hormone (Rx)",halfLife:"Analog-dependent",bioavailability:"Subcutaneous",reversible:"caution",evidence:"A",
  desc:"The master storage hormone — drives glucose & amino acids into cells; potent, but a dosing error causes dangerous hypoglycemia.",
  targetOrgans:[O("Pancreas","caution","exogenous overrides feedback"),O("Skeletal Muscle","positive","nutrient uptake / anabolism"),O("Adipose Tissue","negative","fat storage"),O("Brain / CNS","caution","hypoglycemia risk")],
  synergies:[S("pramlintide","mealtime co-therapy")],
  clashes:[C("retatrutide","additive hypoglycemia — dangerous"),C("semaglutide","additive hypoglycemia — dangerous"),C("tirzepatide","additive hypoglycemia — dangerous"),C("metformin","additive hypoglycemia"),C("berberine","additive hypoglycemia")],
  bloodMarkerImpact:["↓ glucose (hypo risk)","↑ weight"],foodDrug:[FD("Alcohol","unpredictable hypoglycemia")],dosingInfo:"Clinician-only; precise carb/dose matching. Hypoglycemia can be life-threatening.",cautions:["Severe hypoglycemia risk","Fat gain","Performance use is high-risk"],cofactor:"Glucose monitoring; never casually combine with other glucose-lowering agents.",refs:["Insulin clinical pharmacology"] },

{ id:"tesofensine",name:"Tesofensine",category:"oral",route:"Oral (daily)",class:"Triple monoamine reuptake inhibitor",halfLife:"~8 days",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"Serotonin–noradrenaline–dopamine reuptake inhibitor — strong appetite suppression & weight loss in trials; stimulant-type profile.",
  targetOrgans:[O("Brain / CNS","positive","appetite suppression / focus"),O("Adipose Tissue","positive","weight loss"),O("Cardiovascular","caution","↑ HR/BP")],
  synergies:[],clashes:[C("bupropion","additive monoamine / cardiac stimulation")],bloodMarkerImpact:["↓ weight","↑ HR/BP"],foodDrug:[FD("MAOIs","serotonergic/adrenergic crisis — avoid"),FD("Stimulants","additive cardiac load")],dosingInfo:"Oral daily; long half-life accumulates. Investigational/Rx.",cautions:["↑ HR/BP","Mood / sleep","Long half-life"],cofactor:null,refs:["Astrup 2008, Lancet"] },

{ id:"adipotide",name:"Adipotide (FTPP)",category:"peptide",route:"SubQ",class:"Pro-apoptotic fat-vasculature peptide",halfLife:"Short",bioavailability:"Subcutaneous",reversible:"caution",evidence:"D",
  desc:"Targets the blood supply of fat tissue to trigger fat-cell death — dramatic animal fat loss but dose-dependent kidney toxicity.",
  targetOrgans:[O("Adipose Tissue","positive","fat-vasculature apoptosis"),O("Kidneys","negative","nephrotoxicity (primate trials)")],
  synergies:[],clashes:[],bloodMarkerImpact:["↓ weight (animal)","↑ renal markers"],foodDrug:[],dosingInfo:"Education only — renal-toxicity signal halted enthusiasm.",cautions:["Kidney toxicity","No human data"],cofactor:"Renal monitoring — high-risk.",refs:["Barnhart 2011 (primate)"] },

/* =============================== PEPTIDES — GUT / SKIN / IMMUNE / NEURO (added) =============================== */
{ id:"teduglutide",name:"Teduglutide",category:"peptide",route:"SubQ (daily)",class:"GLP-2 analog (approved)",halfLife:"~2 h",bioavailability:"Subcutaneous",reversible:"yes",evidence:"A",
  desc:"GLP-2 analog (Gattex) — grows intestinal mucosa & absorption; approved for short-bowel syndrome.",
  targetOrgans:[O("Gut / GI","positive","intestinal mucosal growth / absorption"),O("Immune System","caution","trophic — neoplasia surveillance")],
  synergies:[S("bpc-157","gut-mucosal healing")],clashes:[],bloodMarkerImpact:["nutrient absorption (clinical)"],foodDrug:[],dosingInfo:"Daily SubQ; colonoscopy surveillance. Prescriber-directed.",cautions:["Trophic — neoplasia surveillance","Fluid overload"],cofactor:null,refs:["Gattex FDA label"] },

{ id:"larazotide",name:"Larazotide",category:"peptide",route:"Oral",class:"Tight-junction (zonulin) regulator",halfLife:"Gut-local",bioavailability:"Oral (gut-local)",reversible:"yes",evidence:"C",
  desc:"Zonulin antagonist — tightens intestinal junctions ('leaky gut'); studied for celiac.",
  targetOrgans:[O("Gut / GI","positive","barrier integrity"),O("Immune System","positive","reduced antigen leak")],
  synergies:[S("kpv","gut anti-inflammatory"),S("bpc-157","gut healing")],clashes:[],bloodMarkerImpact:["gut permeability (research)"],foodDrug:[],dosingInfo:"Oral before meals. Education only.",cautions:["Phase-3 missed primary endpoint"],cofactor:null,refs:["Celiac trials (Alba/CeD)"] },

{ id:"afamelanotide",name:"Afamelanotide",category:"peptide",route:"SubQ implant",class:"MC1R agonist (approved)",halfLife:"Implant (slow)",bioavailability:"Subcutaneous implant",reversible:"yes",evidence:"A",
  desc:"α-MSH analog (Scenesse) — stimulates protective eumelanin; approved for erythropoietic protoporphyria.",
  targetOrgans:[O("Skin / Connective","positive","photoprotective melanin"),O("Immune System","positive","photoprotection")],
  synergies:[],clashes:[C("melanotan-2","redundant melanocortin — mole/melanoma stacking risk")],bloodMarkerImpact:["skin pigmentation"],foodDrug:[],dosingInfo:"Subdermal implant placed by a clinician.",cautions:["Pigmentation","Mole monitoring"],cofactor:null,refs:["Scenesse FDA approval"] },

{ id:"setmelanotide",name:"Setmelanotide",category:"peptide",route:"SubQ (daily)",class:"MC4R agonist (approved)",halfLife:"~11 h",bioavailability:"Subcutaneous",reversible:"yes",evidence:"A",
  desc:"Melanocortin-4 agonist (Imcivree) — approved for rare genetic obesity; restores satiety signaling.",
  targetOrgans:[O("Brain / CNS","positive","satiety (MC4R)"),O("Adipose Tissue","positive","weight loss"),O("Skin / Connective","caution","hyperpigmentation"),O("Cardiovascular","caution","mild ↑BP")],
  synergies:[],clashes:[],bloodMarkerImpact:["↓ weight","mild ↑BP"],foodDrug:[],dosingInfo:"Daily SubQ; genetic-indication specific. Prescriber-directed.",cautions:["Skin darkening","Injection-site reactions"],cofactor:null,refs:["Imcivree FDA approval"] },

{ id:"humanin",name:"Humanin",category:"peptide",route:"SubQ",class:"Mitochondrial-derived peptide",halfLife:"Short",bioavailability:"Subcutaneous",reversible:"yes",evidence:"D",
  desc:"Mitochondrial-derived peptide — cytoprotective, metabolic & neuroprotective signals (mostly preclinical).",
  targetOrgans:[O("Mitochondria","positive","cytoprotection"),O("Brain / CNS","positive","neuroprotection"),O("Pancreas","positive","insulin sensitivity (animal)")],
  synergies:[S("mots-c","mitochondrial-peptide pair"),S("nad-plus","mitochondrial support"),S("ss-31","mito protection")],clashes:[],bloodMarkerImpact:["research"],foodDrug:[],dosingInfo:"Education only — preclinical.",cautions:["Minimal human data"],cofactor:null,refs:["Lee 2013 (MDP biology)"] },

{ id:"thymulin",name:"Thymulin",category:"peptide",route:"SubQ",class:"Zinc-dependent thymic peptide",halfLife:"Short",bioavailability:"Subcutaneous",reversible:"yes",evidence:"D",
  desc:"Zinc-dependent thymic hormone — immune modulation plus anti-inflammatory/analgesic signals (preclinical).",
  targetOrgans:[O("Immune System","positive","T-cell modulation"),O("Brain / CNS","positive","neuro-inflammation (animal)")],
  synergies:[S("thymosin-a1","thymic immune support"),S("thymalin","thymic peptides"),S("zinc","zinc-dependent cofactor")],clashes:[],bloodMarkerImpact:["immune markers"],foodDrug:[],dosingInfo:"Education only.",cautions:["Weak human evidence"],cofactor:"Requires adequate zinc.",refs:["Thymulin literature"] },

{ id:"cortexin",name:"Cortexin",category:"peptide",route:"IM (course)",class:"Cortical neuropeptide complex",halfLife:"Course-based",bioavailability:"IM",reversible:"yes",evidence:"D",
  desc:"Russian cortical peptide complex — neuroprotective/cognitive claims; used clinically in CIS, minimal Western data.",
  targetOrgans:[O("Brain / CNS","positive","neuroprotection (claimed)")],
  synergies:[S("cerebrolysin","neurotrophic pair"),S("semax","cognitive support")],clashes:[],bloodMarkerImpact:["cognitive (clinical)"],foodDrug:[],dosingInfo:"IM in courses. Education only.",cautions:["Weak Western evidence"],cofactor:null,refs:["Russian clinical use"] },

/* =============================== SUPPLEMENTS — PEPTIDE-SUPPORT (added) =============================== */
{ id:"electrolytes",name:"Electrolytes (Na/K/Mg)",category:"supplement",route:"Oral",class:"Mineral salts",halfLife:"—",bioavailability:"Oral",reversible:"yes",evidence:"B",
  desc:"Sodium / potassium / magnesium replacement — prevents cramps, dizziness & fatigue during fluid shifts (low-carb, GLP-1, fasting, heat).",
  targetOrgans:[O("Cardiovascular","positive","rhythm / BP stability"),O("Skeletal Muscle","positive","cramp prevention"),O("Kidneys","caution","sodium load in salt-sensitive / HTN")],
  synergies:[S("taurine","cramp / output support")],clashes:[],bloodMarkerImpact:["sodium / potassium balance"],foodDrug:[],dosingInfo:"Match to losses; mind sodium if hypertensive.",cautions:["Sodium load in hypertension","Potassium caution in renal impairment"],cofactor:null,refs:["Hydration / electrolyte literature"] },

{ id:"eaa",name:"EAAs / Protein",category:"supplement",route:"Oral",class:"Essential amino acids",halfLife:"—",bioavailability:"Oral",reversible:"yes",evidence:"A",
  desc:"Essential amino acids / adequate protein — the substrate for muscle protein synthesis; critical for preserving lean mass in a deficit.",
  targetOrgans:[O("Skeletal Muscle","positive","muscle protein synthesis"),O("Skin / Connective","positive","tissue repair")],
  synergies:[S("creatine","lean-mass support")],clashes:[],bloodMarkerImpact:["nitrogen balance"],foodDrug:[],dosingInfo:"~1.6–2.2 g protein/kg/day, or EAAs around training.",cautions:["Whole-protein generally preferable to isolated EAAs"],cofactor:null,refs:["Muscle protein-synthesis literature"] },

{ id:"probiotic",name:"Probiotics",category:"supplement",route:"Oral",class:"Live beneficial microbes",halfLife:"—",bioavailability:"Oral (gut-local)",reversible:"yes",evidence:"B",
  desc:"Strain-specific live cultures — support gut barrier, digestion & immune balance; useful around antibiotics or GI-irritating compounds.",
  targetOrgans:[O("Gut / GI","positive","microbiome / barrier"),O("Immune System","positive","mucosal immunity")],
  synergies:[S("psyllium","fiber feeds the microbiome (prebiotic)")],clashes:[],bloodMarkerImpact:["GI tolerance"],foodDrug:[FD("Antibiotics","separate dosing by a few hours")],dosingInfo:"Strain-specific; consistency matters. Education only.",cautions:["Strain quality varies","Caution if immunocompromised"],cofactor:null,refs:["Strain-specific RCTs"] }
];

/* ---- cross-class support pairings: peptides recommend supportive supplements ---- */
(function(){
  const by = Object.fromEntries(window.COMPOUNDS.map(c => [c.id, c]));
  const add = (id, sid, reason) => { const c = by[id]; if(c && by[sid] && !c.synergies.some(s=>s.id===sid)) c.synergies.push({ id:sid, reason }); };
  ["retatrutide","semaglutide","tirzepatide","liraglutide","survodutide","mazdutide","cagrilintide"].forEach(id => {
    add(id,"psyllium","soluble fiber eases GLP-1 constipation + adds satiety");
    add(id,"magnesium","replaces electrolytes lost to GI fluid shifts");
    add(id,"electrolytes","prevents cramps / dizziness from low intake");
    add(id,"eaa","preserve lean mass during a calorie deficit");
    add(id,"creatine","protects strength & lean mass during rapid loss");
  });
  add("tesamorelin","omega-3","amplifies visceral & liver-fat loss");
  add("mk-677","berberine","offsets MK-677's glucose / insulin-resistance rise");
  add("bpc-157","vitamin-c","collagen-synthesis cofactor for tendon/ligament repair");
  add("bpc-157","collagen","substrate for connective-tissue repair");
  add("tb-500","omega-3","anti-inflammatory recovery support");
  add("ghk-cu","vitamin-c","cofactor for collagen synthesis");
  add("semax","omega-3","DHA substrate for the BDNF/plasticity it drives");
  add("selank","magnesium","complementary calm without sedation");
  add("mots-c","urolithin-a","stacks mitochondrial biogenesis + mitophagy");
  add("ss-31","coq10","complementary mitochondrial antioxidant");
})();

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGlobe, 
  faBuildingColumns, 
  faCogs, 
  faMobileScreen, 
  faArrowLeft, 
  faCheckCircle,
  faLayerGroup
} from '@fortawesome/free-solid-svg-icons';

export default function Services() {
  // قائمة الخدمات التفصيلية لشركة Data Lynx
  const services = [
    {
      id: 'web-dev',
      icon: faGlobe,
      title: 'تصميم وتطوير المواقع والصفحات',
      subtitle: 'مواقع شخصية ومهنية، صفحات هبوط تسويقية، ومتاجر إلكترونية',
      description: 'نصمم ونطور مواقع ويب فائقة السرعة ومتجاوبة مع كافة الشاشات، مخصصة للعيادات، المكاتب القانونية، الشركات، والمتاجر الإلكترونية مع أفضل تجربة مستخدم (UI/UX).',
      tags: ['صفحات هبوط', 'متاجر E-Commerce', 'مواقع عيادات وأطباء', 'مواقع تعريفية'],
      color: 'from-blue-500 to-cyan-400',
      borderColor: 'group-hover:border-blue-500/50',
      badge: 'الأكثر طلباً'
    },
    {
      id: 'erp-systems',
      icon: faBuildingColumns,
      title: 'أنظمة إدارة المنشآت والشركات',
      subtitle: 'حلول برمجية وانظمة مخصصة لكل نشاط تجاري',
      description: 'نبني أنظمة إدارة مكتبية وسحابية متكاملة تضمن الأتمتة الكاملة لإدارة عملائك، المواعيد، الفواتير، والبيانات الحساسة بأعلى مستويات الأمان والسرعة.',
      tags: ['إدارة المكاتب', 'سيستم عيادات وصيدليات', 'أنظمة محاسبية', 'لوحات تحكم ذكية'],
      color: 'from-emerald-500 to-teal-400',
      borderColor: 'group-hover:border-emerald-500/50',
      badge: 'أنظمة مخصصة'
    },
    {
      id: 'odoo-dev',
      icon: faCogs,
      title: 'برمجة وتخصيص أنظمة Odoo ERP',
      subtitle: 'تطوير وتعديل موديولات أودو حسب احتياجك',
      description: 'خبرة متعمقة في تخصيص نظام Odoo بكافة إصدارته، بناء الموديولات المخصصة، تصميم الثيمات والـ Dark Mode، وربط النظام بإضافات المجمتع (OCA) وبوابات الدفع.',
      tags: ['Odoo 18 Customization', 'تطوير Custom Modules', 'تصميم ثيمات Odoo', 'ربط وتكامل النظام'],
      color: 'from-amber-500 to-orange-400',
      borderColor: 'group-hover:border-amber-500/50',
      badge: 'تخصص ERP'
    },
    {
      id: 'mobile-apis',
      icon: faMobileScreen,
      title: 'تطبيقات الهواتف والربط البرمجي',
      subtitle: 'تطبيقات Cross-Platform وتكامل الـ APIs',
      description: 'نبتكر تطبيقات موبايل تعمل على أندرويد و iOS باستخدام أحدث التقنيات مثل React Native و Flutter، مع خدمات ربط واجهات البرمجة (APIs) والدفع الإلكتروني.',
      tags: ['تطبيقات Android & iOS', 'React Native / Flutter', 'تكامل APIs', 'قواعد بيانات سحابية'],
      color: 'from-purple-500 to-indigo-400',
      borderColor: 'group-hover:border-purple-500/50',
      badge: 'حلول ذكية'
    }
  ];

  // إعدادات حركة القوائم والحاويات
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="services" className="py-28 bg-[#020617] relative overflow-hidden text-right">
      
      {/* خلفية جمالية مطابقة لخلفية الهيرو (إضاءات وشبكة) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* شبكة برمجية خفيفة */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
        {/* إضاءة زرقاء */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-datalynx-primary/20 rounded-full blur-[120px] mix-blend-screen"></div>
        {/* إضاءة ذهبية/برتقالية */}
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* رأس القسم (Section Header) */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="px-4 py-1.5 rounded-full border border-datalynx-primary/30 bg-datalynx-primary/10 text-datalynx-primary text-sm font-bold inline-flex items-center gap-2 mb-4"
          >
            <FontAwesomeIcon icon={faLayerGroup} className="text-xs" />
            ماذا نقدم لعملائنا
          </motion.span>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-white leading-tight mb-6"
          >
            حلول برمجية شاملة تُلبي <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-datalynx-primary via-blue-400 to-emerald-400">
              طموحات مؤسستك أو مشروعك
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg leading-relaxed"
          >
            سواء كنت تبحث عن موقع إلكتروني يعكس هويتك، أو سيستم مخصص لإدارة منشأتك، أو تطوير لنظام Odoo؛ نحن في <strong className="text-white">Data Lynx</strong> نقدم لك البرمجيات بأحدث المعايير العالمية.
          </motion.p>
        </div>

        {/* كروت الخدمات (Cards Grid) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`group relative bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-datalynx-primary/10 ${service.borderColor}`}
            >
              <div>
                {/* الجزء العلوي للكارت: الأيقونة والشارة */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} p-0.5 flex items-center justify-center shadow-lg`}>
                    <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex items-center justify-center text-white text-2xl group-hover:bg-transparent transition-colors duration-300">
                      <FontAwesomeIcon icon={service.icon} />
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {service.badge}
                  </span>
                </div>

                {/* العنوان والفرعي */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-datalynx-primary transition-colors">
                  {service.title}
                </h3>
                <span className="block text-xs font-semibold text-slate-400 mb-4">
                  {service.subtitle}
                </span>

                {/* التفاصيل */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* علامات التخصصات (Tags) */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-[12px] font-medium px-3 py-1 rounded-lg bg-slate-800/80 border border-white/5 text-slate-300 flex items-center gap-1.5"
                    >
                      <FontAwesomeIcon icon={faCheckCircle} className="text-[10px] text-datalynx-primary" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* زر طلب الخدمة */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <a 
                  href="https://wa.me/201507071671" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-datalynx-primary transition-colors"
                >
                  طلب هذه الخدمة
                  <FontAwesomeIcon icon={faArrowLeft} className="text-xs group-hover:-translate-x-1.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* دعوة للتواصل الإضافية في أسفل القسم */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-datalynx-primary/20 via-slate-900/80 to-slate-900 border border-datalynx-primary/30 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right backdrop-blur-md"
        >
          <div>
            <h4 className="text-xl font-bold text-white mb-2">
              لديك مشروع خاص أو فكرة تحتاج استشارة تقنية؟
            </h4>
            <p className="text-slate-400 text-sm">
              فريقنا جاهز لدراسة متطلباتك وتحويلها إلى نظام برمجي متكامل يعمل بكفاءة عالية.
            </p>
          </div>
          <a 
            href="https://wa.me/201507071671" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-datalynx-primary text-white rounded-xl font-bold text-sm shrink-0 hover:bg-blue-600 transition-colors shadow-lg shadow-datalynx-primary/20"
          >
            تحدث معنا مباشرة
          </a>
        </motion.div>

      </div>
    </section>
  );
}
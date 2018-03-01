const express = require('express');
const urllib = require('urllib');
const app = express();

app.post('/biz/std_mendian/pd/client/v1/queryPdTypes.action', function(req, res) {
  const data = {
    code: "1", 
    data: {
      pd_types: [
        {
          class_id: "-1", 
          show_order: -1, 
          name: "全部", 
          child_List: [ ], 
          parent_id: "-2"
        }, 
        {
          class_id: "6811281581468932114", 
          show_order: 1, 
          name: "零食", 
          child_List: [ ], 
          parent_id: "-1"
        }, 
        {
          class_id: "8085756668064062371", 
          show_order: 2, 
          name: "酒水", 
          child_List: [ ], 
          parent_id: "-1"
        }, 
        {
          class_id: "7520154256375281252", 
          show_order: 3, 
          name: "饮料", 
          child_List: [
            {
              class_id: "5312740740063822683", 
              show_order: 0, 
              name: "果汁饮品", 
              parent_id: "7520154256375281252"
            }, 
            {
              class_id: "6633796063732360167", 
              show_order: 0, 
              name: "碳酸饮料", 
              parent_id: "7520154256375281252"
            }, 
            {
              class_id: "5588439163670421134", 
              show_order: 0, 
              name: "牛奶", 
              parent_id: "7520154256375281252"
            }
          ], 
          parent_id: "-1"
        }, 
        {
          class_id: "6090530168536040711", 
          show_order: 3, 
          name: "水果", 
          child_List: [ ], 
          parent_id: "-1"
        }, 
        {
          class_id: "7558357490762126933", 
          show_order: 4, 
          name: "香烟", 
          child_List: [
            {
              class_id: "5163122502261018241", 
              show_order: 0, 
              name: "南京", 
              parent_id: "7558357490762126933"
            }, 
            {
              class_id: "8992387422197525229", 
              show_order: 0, 
              name: "苏烟", 
              parent_id: "7558357490762126933"
            }, 
            {
              class_id: "9168765332057380538", 
              show_order: 0, 
              name: "中华", 
              parent_id: "7558357490762126933"
            }
          ], 
          parent_id: "-1"
        }, 
        {
          class_id: "4688884522031810261", 
          show_order: 5, 
          name: "外卖", 
          child_List: [
            {
              class_id: "6886050839743962882", 
              show_order: 0, 
              name: "烧烤", 
              parent_id: "4688884522031810261"
            }
          ], 
          parent_id: "-1"
        }, 
        {
          class_id: "8961067602596239061", 
          show_order: 8, 
          name: "杂货", 
          child_List: [ ], 
          parent_id: "-1"
        }, 
        {
          class_id: "4749341895069601458", 
          show_order: 9, 
          name: "测试商品", 
          child_List: [ ], 
          parent_id: "-1"
        }, 
        {
          class_id: "6658324877321938739", 
          show_order: 99, 
          name: "测试1", 
          child_List: [ ], 
          parent_id: "-1"
        }, 
        {
          class_id: "1", 
          show_order: 99999, 
          name: "测试", 
          child_List: [
            {
              class_id: "7370352256709503477", 
              show_order: 0, 
              name: "测试二", 
              parent_id: "1"
            }
          ], 
          parent_id: "-1"
        }
      ]
    }, 
    message: "", 
    success: true, 
    sysTime: "2018-02-27 14:38:01"
  };

  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  res.send(data);
});

app.post('/biz/std_mendian/pd/client/v1/queryPds.action', function(req, res) {
  const data = {
    message: "成功", 
    data: {
      total: 54, 
      products: [
        {
          spec: "", 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: "", 
              unit_id: "8733698526656354110", 
              unit_name: "袋", 
              unit_price: "1.00"
            }, 
            {
              is_base: "0", 
              unit_ratio: 10, 
              barcode: "", 
              unit_id: "7286880668258160099", 
              unit_name: "箱", 
              unit_price: "10.00"
            }
          ], 
          unit_id: "7286880668258160099", 
          bind_mz_promotion_id: null, 
          code: "1001", 
          is_promotion_pd2: "0", 
          pd_id: "8716338377476556953", 
          picture: "6019160693176440422/product/201710/f54ff5ef6ee6408684568361cdfaa3a3.jpg?x-oss-process=style/zk320", 
          promotion_type: null, 
          price: "10.00", 
          base_unit_price: "1.00000000", 
          prop_values: "", 
          name: "百草味 坚果零食干果 内含开果器 夏威夷果奶油味200g/袋", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "", 
          unit_name: "箱", 
          item_type: "1"
        }, 
        {
          spec: "", 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: "", 
              unit_id: "7126032597324599209", 
              unit_name: "袋", 
              unit_price: "10.00"
            }
          ], 
          unit_id: "7126032597324599209", 
          bind_mz_promotion_id: null, 
          code: "1002", 
          is_promotion_pd2: "0", 
          pd_id: "5225963731657778695", 
          picture: "6019160693176440422/product/201710/ac6001973fa347a78e1668347f798d3f.jpg?x-oss-process=style/zk320", 
          promotion_type: null, 
          price: "10.00", 
          base_unit_price: "10.00000000", 
          prop_values: "", 
          name: "百草味 坚果炒货 干果零食核桃 碧根果190g/袋", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "", 
          unit_name: "袋", 
          item_type: "1"
        }, 
        {
          spec: "", 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: "", 
              unit_id: "7229231027920852000", 
              unit_name: "袋", 
              unit_price: "15.00"
            }
          ], 
          unit_id: "7229231027920852000", 
          bind_mz_promotion_id: null, 
          code: "1003", 
          is_promotion_pd2: "0", 
          pd_id: "5014176280607190013", 
          picture: "6019160693176440422/product/201710/6a46d1998295494da569da85c74aeb71.jpg?x-oss-process=style/zk320", 
          promotion_type: null, 
          price: "15.00", 
          base_unit_price: "15.00000000", 
          prop_values: "", 
          name: "百草味 坚果炒货 休闲零食 开心果200g/袋", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "", 
          unit_name: "袋", 
          item_type: "1"
        }, 
        {
          spec: "", 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: "", 
              unit_id: "5163946522155594491", 
              unit_name: "袋", 
              unit_price: "8.00"
            }
          ], 
          unit_id: "5163946522155594491", 
          bind_mz_promotion_id: null, 
          code: "1004", 
          is_promotion_pd2: "0", 
          pd_id: "7818776836856147567", 
          picture: "6019160693176440422/product/201710/8ef9f856eddb4d3eb60dab61030f1ec7.jpg?x-oss-process=style/zk320", 
          promotion_type: null, 
          price: "8.00", 
          base_unit_price: "8.00000000", 
          prop_values: "", 
          name: "百草味 板栗休闲零食 熟板栗仁80g/袋", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "", 
          unit_name: "袋", 
          item_type: "1"
        }, 
        {
          spec: "", 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: "", 
              unit_id: "6219187590270928689", 
              unit_name: "袋", 
              unit_price: "20.00"
            }, 
            {
              is_base: "0", 
              unit_ratio: 20, 
              barcode: "", 
              unit_id: "7209962142449746410", 
              unit_name: "箱", 
              unit_price: "400.00"
            }
          ], 
          unit_id: "7209962142449746410", 
          bind_mz_promotion_id: null, 
          code: "121212", 
          is_promotion_pd2: "0", 
          pd_id: "8332859914712369841", 
          picture: "", 
          promotion_type: null, 
          price: "400.00", 
          base_unit_price: "20.00000000", 
          prop_values: "", 
          name: "锅巴", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "", 
          unit_name: "箱", 
          item_type: "1"
        }, 
        {
          spec: "500ml", 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: "", 
              unit_id: "4999071535365689684", 
              unit_name: "瓶", 
              unit_price: "100.00"
            }, 
            {
              is_base: "0", 
              unit_ratio: 6, 
              barcode: "", 
              unit_id: "4844982740746131755", 
              unit_name: "箱", 
              unit_price: "600.00"
            }
          ], 
          unit_id: "4999071535365689684", 
          bind_mz_promotion_id: null, 
          code: "214702007500", 
          is_promotion_pd2: "0", 
          pd_id: "7878424888750341809", 
          picture: "", 
          promotion_type: null, 
          price: "100.00", 
          base_unit_price: "100.00000000", 
          prop_values: "", 
          name: "海之蓝", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "500ml", 
          unit_name: "瓶", 
          item_type: "1"
        }, 
        {
          spec: "", 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: "", 
              unit_id: "5180710293717156739", 
              unit_name: "袋", 
              unit_price: "32.00"
            }
          ], 
          unit_id: "5180710293717156739", 
          bind_mz_promotion_id: null, 
          code: "4001", 
          is_promotion_pd2: "0", 
          pd_id: "5020305536265908653", 
          picture: "6019160693176440422/product/201802/823ad4a91b0d4552b513b6ffddd5aa0e.jpg?x-oss-process=style/zk320", 
          promotion_type: null, 
          price: "32.00", 
          base_unit_price: "32.00000000", 
          prop_values: "", 
          name: "三只松鼠_开心果225gx2袋休闲零食坚果炒货干果原味无漂白", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "", 
          unit_name: "袋", 
          item_type: "1"
        }, 
        {
          spec: "", 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: "", 
              unit_id: "8704901164504563064", 
              unit_name: "瓶", 
              unit_price: "3.00"
            }
          ], 
          unit_id: "8704901164504563064", 
          bind_mz_promotion_id: null, 
          code: "4710110800549", 
          is_promotion_pd2: "0", 
          pd_id: "9180363080857456148", 
          picture: "6019160693176440422/bas_pd/201712/6446523524062241022.jpg?x-oss-process=style/zk320", 
          promotion_type: null, 
          price: "3.00", 
          base_unit_price: "3.00000000", 
          prop_values: "", 
          name: "新茶道菊花茶", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "", 
          unit_name: "瓶", 
          item_type: "1"
        }, 
        {
          spec: "", 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: "", 
              unit_id: "6143808222222829825", 
              unit_name: "瓶", 
              unit_price: "0.30"
            }, 
            {
              is_base: "0", 
              unit_ratio: 10, 
              barcode: "", 
              unit_id: "8989207107038597209", 
              unit_name: "箱", 
              unit_price: "3.00"
            }
          ], 
          unit_id: "8989207107038597209", 
          bind_mz_promotion_id: null, 
          code: "80002", 
          is_promotion_pd2: "0", 
          pd_id: "5421823651167461312", 
          picture: "6019160693176440422/product/201710/5c14e4bf27c342a698db22163d81b002.jpg?x-oss-process=style/zk320", 
          promotion_type: null, 
          price: "3.00", 
          base_unit_price: "0.30000000", 
          prop_values: "", 
          name: "雪碧", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "", 
          unit_name: "箱", 
          item_type: "1"
        }, 
        {
          spec: "[123,中辣]", 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: "", 
              unit_id: "4670431776367149174", 
              unit_name: "斤", 
              unit_price: "10.00"
            }, 
            {
              is_base: "0", 
              unit_ratio: 3, 
              barcode: "", 
              unit_id: "7806786522943812747", 
              unit_name: "盒", 
              unit_price: "30.00"
            }, 
            {
              is_base: "0", 
              unit_ratio: 6, 
              barcode: "", 
              unit_id: "8243000485021849920", 
              unit_name: "箱", 
              unit_price: "60.00"
            }
          ], 
          unit_id: "4670431776367149174", 
          bind_mz_promotion_id: null, 
          code: "bas1020", 
          is_promotion_pd2: "0", 
          pd_id: "5285126120272974708", 
          picture: "6019160693176440422/bas_pd/201711/8729361300837242149.jpg?x-oss-process=style/zk320", 
          promotion_type: null, 
          price: "10.00", 
          base_unit_price: "10.00000000", 
          prop_values: "123,中辣", 
          name: "维达细韧压花抽纸", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "", 
          unit_name: "斤", 
          item_type: "1"
        }, 
        {
          spec: "500ml", 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: "", 
              unit_id: "5739578036122369189", 
              unit_name: "瓶", 
              unit_price: "5.00"
            }, 
            {
              is_base: "0", 
              unit_ratio: 24, 
              barcode: "", 
              unit_id: "5603740104554989069", 
              unit_name: "箱", 
              unit_price: "120.00"
            }
          ], 
          unit_id: "5739578036122369189", 
          bind_mz_promotion_id: null, 
          code: "ck001", 
          is_promotion_pd2: "0", 
          pd_id: "6885398322925871423", 
          picture: "", 
          promotion_type: null, 
          price: "5.00", 
          base_unit_price: "5.00000000", 
          prop_values: "", 
          name: "可乐", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "500ml", 
          unit_name: "瓶", 
          item_type: "1"
        }, 
        {
          spec: "200ml", 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: "", 
              unit_id: "4736542505534051700", 
              unit_name: "瓶", 
              unit_price: "15.00"
            }, 
            {
              is_base: "0", 
              unit_ratio: 24, 
              barcode: "", 
              unit_id: "6825046678773394767", 
              unit_name: "箱", 
              unit_price: "360.00"
            }
          ], 
          unit_id: "6825046678773394767", 
          bind_mz_promotion_id: null, 
          code: "ck002", 
          is_promotion_pd2: "0", 
          pd_id: "5154599139125223903", 
          picture: "6019160693176440422/product/201710/86936ab9650a4a958a7d0b55248e8414.jpg?x-oss-process=style/zk320", 
          promotion_type: null, 
          price: "360.00", 
          base_unit_price: "15.00000000", 
          prop_values: "", 
          name: "冰红茶", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "200ml", 
          unit_name: "箱", 
          item_type: "1"
        }, 
        {
          spec: "", 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: "", 
              unit_id: "6031361293426648520", 
              unit_name: "袋", 
              unit_price: "1.11"
            }
          ], 
          unit_id: "6031361293426648520", 
          bind_mz_promotion_id: null, 
          code: "fdsgdf", 
          is_promotion_pd2: "0", 
          pd_id: "8195523556089835792", 
          picture: "", 
          promotion_type: null, 
          price: "1.11", 
          base_unit_price: "1.11000000", 
          prop_values: "", 
          name: "娟子豆腐", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "", 
          unit_name: "袋", 
          item_type: "1"
        }, 
        {
          spec: "浓[1,不辣]", 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: "", 
              unit_id: "5420662257281996075", 
              unit_name: "瓶", 
              unit_price: "4.00"
            }
          ], 
          unit_id: "5420662257281996075", 
          bind_mz_promotion_id: null, 
          code: "MSLA001", 
          is_promotion_pd2: "0", 
          pd_id: "4941412049950820123", 
          picture: "6019160693176440422/product/201612/25ad230338c44add8fb311577299f32d.jpg?x-oss-process=style/zk320", 
          promotion_type: null, 
          price: "4.00", 
          base_unit_price: "4.00000000", 
          prop_values: "1,不辣", 
          name: "莫斯利安", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "浓", 
          unit_name: "瓶", 
          item_type: "1"
        }, 
        {
          spec: "浓[123123ds,中辣]", 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: "213213", 
              unit_id: "6314592967961056192", 
              unit_name: "个", 
              unit_price: "23.00"
            }
          ], 
          unit_id: "6314592967961056192", 
          bind_mz_promotion_id: null, 
          code: "msla1234", 
          is_promotion_pd2: "0", 
          pd_id: "8731047022501632996", 
          picture: "", 
          promotion_type: null, 
          price: "23.00", 
          base_unit_price: "23.00000000", 
          prop_values: "123123ds,中辣", 
          name: "莫斯利安", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "浓", 
          unit_name: "个", 
          item_type: "1"
        }, 
        {
          spec: "浓[1231232,麻辣]", 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: "", 
              unit_id: "5126838605848860688", 
              unit_name: "瓶", 
              unit_price: "10.00"
            }, 
            {
              is_base: "0", 
              unit_ratio: 44, 
              barcode: "", 
              unit_id: "5644957976358858590", 
              unit_name: "盒", 
              unit_price: "440.00"
            }, 
            {
              is_base: "0", 
              unit_ratio: 11, 
              barcode: "", 
              unit_id: "6062053233667951220", 
              unit_name: "袋", 
              unit_price: "110.00"
            }, 
            {
              is_base: "0", 
              unit_ratio: 22, 
              barcode: "", 
              unit_id: "9092291417976000734", 
              unit_name: "斤", 
              unit_price: "220.00"
            }, 
            {
              is_base: "0", 
              unit_ratio: 88, 
              barcode: "", 
              unit_id: "7666878117899496043", 
              unit_name: "件", 
              unit_price: "880.00"
            }
          ], 
          unit_id: "5126838605848860688", 
          bind_mz_promotion_id: null, 
          code: "msla14", 
          is_promotion_pd2: "0", 
          pd_id: "9121708793794915643", 
          picture: "6019160693176440422/product/201612/bdae5a2afdeb4b57b45d6b0c16045755.jpg?x-oss-process=style/zk320", 
          promotion_type: null, 
          price: "10.00", 
          base_unit_price: "10.00000000", 
          prop_values: "1231232,麻辣", 
          name: "莫斯利安", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "浓", 
          unit_name: "瓶", 
          item_type: "1"
        }, 
        {
          spec: "1[1,不辣]", 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: "", 
              unit_id: "7115084363069435684", 
              unit_name: "斤", 
              unit_price: "11.27"
            }
          ], 
          unit_id: "7115084363069435684", 
          bind_mz_promotion_id: null, 
          code: "shuiguo73", 
          is_promotion_pd2: "0", 
          pd_id: "4838120405578363985", 
          picture: "", 
          promotion_type: null, 
          price: "11.27", 
          base_unit_price: "11.27000000", 
          prop_values: "1,不辣", 
          name: "柚子3", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "1", 
          unit_name: "斤", 
          item_type: "1"
        }, 
        {
          spec: null, 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: null, 
              unit_id: "8230552237691633296", 
              unit_name: "斤", 
              unit_price: "12.27"
            }
          ], 
          unit_id: "8230552237691633296", 
          bind_mz_promotion_id: null, 
          code: "shuiguo74", 
          is_promotion_pd2: "0", 
          pd_id: "6504593903246602977", 
          picture: "", 
          promotion_type: null, 
          price: "12.27", 
          base_unit_price: "12.27000000", 
          prop_values: "", 
          name: "黑普林3", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "", 
          unit_name: "斤", 
          item_type: "1"
        }, 
        {
          spec: "[1,不辣]", 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: "", 
              unit_id: "4673716222038587931", 
              unit_name: "斤", 
              unit_price: "11.28"
            }
          ], 
          unit_id: "4673716222038587931", 
          bind_mz_promotion_id: null, 
          code: "shuiguo75", 
          is_promotion_pd2: "0", 
          pd_id: "8830853100682290531", 
          picture: "", 
          promotion_type: null, 
          price: "11.28", 
          base_unit_price: "11.28000000", 
          prop_values: "1,不辣", 
          name: "柚子3", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "", 
          unit_name: "斤", 
          item_type: "1"
        }, 
        {
          spec: null, 
          promotion: "0", 
          is_promotion_pd: "0", 
          unit_info: [
            {
              is_base: "1", 
              unit_ratio: 1, 
              barcode: null, 
              unit_id: "6280449948049060892", 
              unit_name: "斤", 
              unit_price: "12.28"
            }
          ], 
          unit_id: "6280449948049060892", 
          bind_mz_promotion_id: null, 
          code: "shuiguo76", 
          is_promotion_pd2: "0", 
          pd_id: "5166231327617248463", 
          picture: "", 
          promotion_type: null, 
          price: "12.28", 
          base_unit_price: "12.28000000", 
          prop_values: "", 
          name: "哈密瓜3", 
          promotion_tag: null, 
          in_shopCart: "0", 
          name_spec: "", 
          unit_name: "斤", 
          item_type: "1"
        }
      ], 
      price_visible: "1"
    }, 
    code: "1"
  };

  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  res.send(data);
});

app.post('/biz/std_mendian/shoppingCart/client/v1/list.action', function(req, res) {
  const data = {
    message: "", 
    data: {
      check_inventory_verification: "0", 
      customer_name: "刘翠丽经销商", 
      customer_trade_type: "2", 
      invalid_cart_items: [ ], 
      mz_promotion_overlaps: [ ], 
      price_visible: "1", 
      shopping_cart_items: [
        {
          item_type: "1", 
          mz_promotion: null, 
          pd_info: {
            is_gift: "", 
            item_count: 1, 
            name_spec: "", 
            pd_id: "5020305536265908653", 
            pd_name: "三只松鼠_开心果225gx2袋休闲零食坚果炒货干果原味无漂白", 
            price: "32.00", 
            shopping_cart_item_id: "7636829280572804484", 
            small_pic: "6019160693176440422/product/201802/823ad4a91b0d4552b513b6ffddd5aa0e.jpg", 
            spec: "", 
            unit_id: "5180710293717156739", 
            unit_name: "袋"
          }, 
          zh_promotion: null
        }, 
        {
          item_type: "1", 
          mz_promotion: null, 
          pd_info: {
            is_gift: "", 
            item_count: 1, 
            name_spec: "", 
            pd_id: "9180363080857456148", 
            pd_name: "新茶道菊花茶", 
            price: "3.00", 
            shopping_cart_item_id: "5235644486550095985", 
            small_pic: "6019160693176440422/bas_pd/201712/6446523524062241022.jpg", 
            spec: "", 
            unit_id: "8704901164504563064", 
            unit_name: "瓶"
          }, 
          zh_promotion: null
        }, 
        {
          item_type: "1", 
          mz_promotion: null, 
          pd_info: {
            is_gift: "", 
            item_count: 1, 
            name_spec: "", 
            pd_id: "5225963731657778695", 
            pd_name: "百草味 坚果炒货 干果零食核桃 碧根果190g/袋", 
            price: "10.00", 
            shopping_cart_item_id: "6361184835745751585", 
            small_pic: "6019160693176440422/product/201710/ac6001973fa347a78e1668347f798d3f.jpg", 
            spec: "", 
            unit_id: "7126032597324599209", 
            unit_name: "袋"
          }, 
          zh_promotion: null
        }, 
        {
          item_type: "1", 
          mz_promotion: null, 
          pd_info: {
            is_gift: "", 
            item_count: 1, 
            name_spec: "", 
            pd_id: "8716338377476556953", 
            pd_name: "百草味 坚果零食干果 内含开果器 夏威夷果奶油味200g/袋", 
            price: "10.00", 
            shopping_cart_item_id: "6565751985346707660", 
            small_pic: "6019160693176440422/product/201710/f54ff5ef6ee6408684568361cdfaa3a3.jpg", 
            spec: "", 
            unit_id: "7286880668258160099", 
            unit_name: "箱"
          }, 
          zh_promotion: null
        }
      ], 
      supplier_name: "运维测试部"
    }, 
    code: "1", 
    success: true
  };

  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  res.send(data);
});

app.post('/biz/std_mendian/shoppingCart/client/v1/delete.action', function(req, res) {
  const data = {
    message: "", 
    data: "", 
    code: "1", 
    success: true
  };

  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  res.send(data);
});

app.post('/biz/std_mendian/shoppingCart/client/v1/updateCount.action', function(req, res) {
  const data = {
    message: "", 
    data: {
      mz_promotion: null, 
      mz_promotion_overlaps: [ ]
    }, 
    code: "1", 
    success: true
  };

  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  res.send(data);
});

app.post('/biz/std_mendian/shoppingCart/client/v1/queryCount.action', function(req, res) {
  const data = {
    message: "", 
    data: 1, 
    code: "1", 
    success: true
  };

  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  res.send(data);
});

app.post('/biz/std_mendian/shoppingCart/client/v1/add.action', function(req, res) {
  const data = {
    message: "加入购物车成功", 
    data: "5332474134265180754", 
    code: "1", 
    success: true
  };

  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  res.send(data);
});

app.post('/address/queryDefault.action', function(req, res) {
  const data = {
    code: "1", 
    data: {
      id: "7359033503803915432", 
      province: "北京市", 
      receive_name: "123", 
      receive_phone: "14141414141", 
      tenant_addr_enable: "0", 
      city: "崇文区", 
      receive_addr: "ttty"
    }, 
    message: "", 
    success: true, 
    sysTime: "2018-02-27 14:49:40"
  };

  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  res.send(data);
});

app.post('/biz/std_mendian/shoppingCart/client/v1/saveOrder.action', function(req, res) {
  const data = {
    message: "", 
    data: "", 
    code: "1", 
    success: true
  };

  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  res.send(data);
});

app.post('/biz/std_mendian/mine/client/v1/listOrders.action', function(req, res) {
  const data = {
    code: "1", 
    data: [
      {
        consignment_date: null, 
        create_time: "2018-02-27 14:53", 
        creatorId: 0, 
        customer_id: "4888385086863319493", 
        customer_name: "刘翠丽经销商", 
        details: [
          {
            spec: "", 
            pd_name: "百草味 坚果零食干果 内含开果器 夏威夷果奶油味200g/袋", 
            small_pic: "6019160693176440422/product/201710/f54ff5ef6ee6408684568361cdfaa3a3.jpg"
          }, 
          {
            spec: "", 
            pd_name: "百草味 坚果炒货 干果零食核桃 碧根果190g/袋", 
            small_pic: "6019160693176440422/product/201710/ac6001973fa347a78e1668347f798d3f.jpg"
          }, 
          {
            spec: "", 
            pd_name: "新茶道菊花茶", 
            small_pic: "6019160693176440422/bas_pd/201712/6446523524062241022.jpg"
          }, 
          {
            spec: "", 
            pd_name: "三只松鼠_开心果225gx2袋休闲零食坚果炒货干果原味无漂白", 
            small_pic: "6019160693176440422/product/201802/823ad4a91b0d4552b513b6ffddd5aa0e.jpg"
          }
        ], 
        em_order_status: "1", 
        em_order_status_name: "待企业确认", 
        em_order_type: "PSI", 
        id: 9215821345464176000, 
        keyid: "9215821345464175950", 
        linkman_id: "5688082342469189580", 
        modifyTime: null, 
        modifyierId: 0, 
        order_amount: "119.00", 
        order_discount_amount: 0, 
        order_id: "9214824295300984324", 
        order_no: "HD201802270000004", 
        pay_amount: 0, 
        pay_status: "", 
        price_visible: "1", 
        receive_addr: "", 
        receive_name: "", 
        receive_phone: "", 
        receive_tel: "", 
        remark: "", 
        show_pay_status: "0", 
        status: "1", 
        supplier_id: "-1", 
        supplier_name: "运维测试部", 
        tenant_id: "6019160693176440422"
      }, 
      {
        consignment_date: null, 
        create_time: "2018-02-27 14:53", 
        creatorId: 0, 
        customer_id: "4888385086863319493", 
        customer_name: "刘翠丽经销商", 
        details: [
          {
            spec: "", 
            pd_name: "百草味 坚果零食干果 内含开果器 夏威夷果奶油味200g/袋", 
            small_pic: "6019160693176440422/product/201710/f54ff5ef6ee6408684568361cdfaa3a3.jpg"
          }, 
          {
            spec: "", 
            pd_name: "百草味 坚果炒货 干果零食核桃 碧根果190g/袋", 
            small_pic: "6019160693176440422/product/201710/ac6001973fa347a78e1668347f798d3f.jpg"
          }, 
          {
            spec: "", 
            pd_name: "新茶道菊花茶", 
            small_pic: "6019160693176440422/bas_pd/201712/6446523524062241022.jpg"
          }, 
          {
            spec: "", 
            pd_name: "三只松鼠_开心果225gx2袋休闲零食坚果炒货干果原味无漂白", 
            small_pic: "6019160693176440422/product/201802/823ad4a91b0d4552b513b6ffddd5aa0e.jpg"
          }
        ], 
        em_order_status: "1", 
        em_order_status_name: "待企业确认", 
        em_order_type: "PSI", 
        id: 6725778925020625000, 
        keyid: "6725778925020625299", 
        linkman_id: "5688082342469189580", 
        modifyTime: null, 
        modifyierId: 0, 
        order_amount: "119.00", 
        order_discount_amount: 0, 
        order_id: "6957906558211418712", 
        order_no: "HD201802270000005", 
        pay_amount: 0, 
        pay_status: "", 
        price_visible: "1", 
        receive_addr: "", 
        receive_name: "", 
        receive_phone: "", 
        receive_tel: "", 
        remark: "", 
        show_pay_status: "0", 
        status: "1", 
        supplier_id: "-1", 
        supplier_name: "运维测试部", 
        tenant_id: "6019160693176440422"
      }, 
      {
        consignment_date: null, 
        create_time: "2018-02-27 14:36", 
        creatorId: 0, 
        customer_id: "4888385086863319493", 
        customer_name: "刘翠丽经销商", 
        details: [
          {
            spec: "", 
            pd_name: "百草味 坚果炒货 干果零食核桃 碧根果190g/袋", 
            small_pic: "6019160693176440422/product/201710/ac6001973fa347a78e1668347f798d3f.jpg"
          }, 
          {
            spec: "", 
            pd_name: "百草味 坚果零食干果 内含开果器 夏威夷果奶油味200g/袋", 
            small_pic: "6019160693176440422/product/201710/f54ff5ef6ee6408684568361cdfaa3a3.jpg"
          }, 
          {
            spec: "", 
            pd_name: "新茶道菊花茶", 
            small_pic: "6019160693176440422/bas_pd/201712/6446523524062241022.jpg"
          }
        ], 
        em_order_status: "1", 
        em_order_status_name: "待企业确认", 
        em_order_type: "PSI", 
        id: 6421000451957580000, 
        keyid: "6421000451957579336", 
        linkman_id: "5688082342469189580", 
        modifyTime: null, 
        modifyierId: 0, 
        order_amount: "33.00", 
        order_discount_amount: 0, 
        order_id: "6517826576623752993", 
        order_no: "HD201802270000003", 
        pay_amount: 0, 
        pay_status: "", 
        price_visible: "1", 
        receive_addr: "", 
        receive_name: "", 
        receive_phone: "", 
        receive_tel: "", 
        remark: "", 
        show_pay_status: "0", 
        status: "1", 
        supplier_id: "-1", 
        supplier_name: "运维测试部", 
        tenant_id: "6019160693176440422"
      }, 
      {
        consignment_date: null, 
        create_time: "2018-02-27 14:35", 
        creatorId: 0, 
        customer_id: "4888385086863319493", 
        customer_name: "刘翠丽经销商", 
        details: [
          {
            spec: "", 
            pd_name: "百草味 坚果炒货 干果零食核桃 碧根果190g/袋", 
            small_pic: "6019160693176440422/product/201710/ac6001973fa347a78e1668347f798d3f.jpg"
          }, 
          {
            spec: "", 
            pd_name: "百草味 坚果零食干果 内含开果器 夏威夷果奶油味200g/袋", 
            small_pic: "6019160693176440422/product/201710/f54ff5ef6ee6408684568361cdfaa3a3.jpg"
          }, 
          {
            spec: "", 
            pd_name: "新茶道菊花茶", 
            small_pic: "6019160693176440422/bas_pd/201712/6446523524062241022.jpg"
          }
        ], 
        em_order_status: "1", 
        em_order_status_name: "待企业确认", 
        em_order_type: "PSI", 
        id: 5953754851021779000, 
        keyid: "5953754851021778830", 
        linkman_id: "5688082342469189580", 
        modifyTime: null, 
        modifyierId: 0, 
        order_amount: "33.00", 
        order_discount_amount: 0, 
        order_id: "5176691850246045987", 
        order_no: "HD201802270000002", 
        pay_amount: 0, 
        pay_status: "", 
        price_visible: "1", 
        receive_addr: "", 
        receive_name: "", 
        receive_phone: "", 
        receive_tel: "", 
        remark: "", 
        show_pay_status: "0", 
        status: "1", 
        supplier_id: "-1", 
        supplier_name: "运维测试部", 
        tenant_id: "6019160693176440422"
      }, 
      {
        consignment_date: null, 
        create_time: "2017-10-31 08:51", 
        creatorId: 0, 
        customer_id: "4888385086863319493", 
        customer_name: "刘翠丽经销商", 
        details: [ ], 
        em_order_status: "5", 
        em_order_status_name: "已取消", 
        em_order_type: "PSI", 
        id: 8187034523403783000, 
        keyid: "8187034523403782691", 
        linkman_id: "5688082342469189580", 
        modifyTime: null, 
        modifyierId: 0, 
        order_amount: "35.81", 
        order_discount_amount: 0, 
        order_id: "7352968183493814609", 
        order_no: "HD201710310000001", 
        pay_amount: 0, 
        pay_status: "", 
        price_visible: "1", 
        receive_addr: "", 
        receive_name: "", 
        receive_phone: "", 
        receive_tel: "", 
        remark: "", 
        show_pay_status: "0", 
        status: "1", 
        supplier_id: "-1", 
        supplier_name: "运维测试部", 
        tenant_id: "6019160693176440422"
      }
    ], 
    message: "", 
    success: true, 
    sysTime: "2018-02-27 14:55:29"
  };

  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  res.send(data);
});

app.post('/biz/std_mendian/mine/client/v1/orderDetail.action', function(req, res) {
  const data = {
    message: "", 
    data: {
      can_apply_return: "0", 
      can_cancel: "1", 
      confirm_reason: "", 
      consignment_date: "2018-02-27", 
      customer_code: "CUS000066", 
      customer_id: "4888385086863319493", 
      customer_name: "刘翠丽经销商", 
      em_order_status: "1", 
      em_order_status_name: "待企业确认", 
      em_order_type: "PSI", 
      emp_order: "0", 
      has_discount: "0", 
      has_pay_record: "0", 
      has_return_record: "0", 
      has_sent_record: "0", 
      incentives_amount: 0, 
      operation_details: [
        {
          operate_time: "2018-02-27 14:53", 
          operate_man: "高晓晗", 
          operate_label: "下单时间"
        }
      ], 
      order_amount: "119.00", 
      order_detail: {
        gifts: [ ], 
        pds: [
          {
            is_gift: "0", 
            item_count: 3, 
            name_spec: "", 
            pd_id: "5020305536265908653", 
            pd_name: "三只松鼠_开心果225gx2袋休闲零食坚果炒货干果原味无漂白", 
            price: "32.00", 
            shopping_cart_item_id: 0, 
            small_pic: "6019160693176440422/product/201802/823ad4a91b0d4552b513b6ffddd5aa0e.jpg", 
            spec: "", 
            unit_id: "5180710293717156739", 
            unit_name: "袋"
          }, 
          {
            is_gift: "0", 
            item_count: 1, 
            name_spec: "", 
            pd_id: "9180363080857456148", 
            pd_name: "新茶道菊花茶", 
            price: "3.00", 
            shopping_cart_item_id: 0, 
            small_pic: "6019160693176440422/bas_pd/201712/6446523524062241022.jpg", 
            spec: "", 
            unit_id: "8704901164504563064", 
            unit_name: "瓶"
          }, 
          {
            is_gift: "0", 
            item_count: 1, 
            name_spec: "", 
            pd_id: "5225963731657778695", 
            pd_name: "百草味 坚果炒货 干果零食核桃 碧根果190g/袋", 
            price: "10.00", 
            shopping_cart_item_id: 0, 
            small_pic: "6019160693176440422/product/201710/ac6001973fa347a78e1668347f798d3f.jpg", 
            spec: "", 
            unit_id: "7126032597324599209", 
            unit_name: "袋"
          }, 
          {
            is_gift: "0", 
            item_count: 1, 
            name_spec: "", 
            pd_id: "8716338377476556953", 
            pd_name: "百草味 坚果零食干果 内含开果器 夏威夷果奶油味200g/袋", 
            price: "10.00", 
            shopping_cart_item_id: 0, 
            small_pic: "6019160693176440422/product/201710/f54ff5ef6ee6408684568361cdfaa3a3.jpg", 
            spec: "", 
            unit_id: "7286880668258160099", 
            unit_name: "箱"
          }
        ]
      }, 
      order_discount_amount: 0, 
      order_id: "9214824295300984324", 
      order_no: "HD201802270000004", 
      pay_status: "", 
      photo_required: "0", 
      price_visible: "1", 
      receive_addr: "北京市崇文区ttty", 
      receive_name: "123", 
      receive_phone: "14141414141", 
      remark: "", 
      show_pay_now: "0", 
      show_pay_status: "0", 
      storehouse_id: "10", 
      supplier_customer_selected: "1", 
      supplier_id: "-1", 
      supplier_name: "运维测试部", 
      tenant_id: "6019160693176440422"
    }, 
    code: "1", 
    success: true
  };

  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  res.send(data);
});

app.post('/biz/std_mendian/mine/client/v1/cancelOrder.action', function(req, res) {
  const data = {
    message: "", 
    data: {
      use_dms: false, 
      order_id: 9214824295300985000
    }, 
    code: "1", 
    success: true
  };

  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  res.send(data);
});

app.post('/biz/std_mendian/pd/client/v1/queryPdInfo.action', function(req, res) {
  const data = {
    message: "成功", 
    data: {
      prop_5: null, 
      spec: "", 
      prop_4: null, 
      detail: "",
      weight: "", 
      promotion: "0", 
      is_promotion_pd: "0", 
      pictures: [
        "6019160693176440422/product/201802/823ad4a91b0d4552b513b6ffddd5aa0e.jpg", 
        "6019160693176440422/product/201802/4020b66272644d00bda988143c325406.jpg", 
        "6019160693176440422/product/201802/95cee0c75065438dbe00dd452cc8f1d8.jpg"
      ], 
      unit_id: "5180710293717156739", 
      is_promotion_pd2: "0", 
      prop_1: null, 
      prop_3: null, 
      pd_id: "5020305536265908653", 
      prop_2: null, 
      is_collect: "0", 
      prop_values: "", 
      name: "三只松鼠_开心果225gx2袋休闲零食坚果炒货干果原味无漂白", 
      prop_info: [ ], 
      promotion_tag: null, 
      name_spec: "", 
      item_type: "1", 
      cost_price: null, 
      unit_info: [
        {
          is_base: "1", 
          unit_ratio: 1, 
          barcode: "", 
          unit_id: "5180710293717156739", 
          unit_name: "袋", 
          unit_price: "32.00"
        }
      ], 
      barcode: "", 
      bind_mz_promotion_id: null, 
      picture: "6019160693176440422/product/201802/823ad4a91b0d4552b513b6ffddd5aa0e.jpg?x-oss-process=style/zk320", 
      promotion_type: null, 
      unit: "袋", 
      price: "32.00", 
      base_unit_price: "32.00000000", 
      suggest_price: null, 
      type_name: "零食", 
      brand: "百草味", 
      valid_period: 0, 
      unit_name: "袋"
    }, 
    code: "1", 
    price_visible: "1"
  };

  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  res.send(data);
});

app.get("/", function(req, rest) {
  var url = decodeURIComponent(req.query.url);
  urllib.request(url, function(err, data, res) {
    if (err) {
      throw err; // you need to handle error
    }
    rest.setHeader("Access-Control-Allow-Origin", "*");
    rest.setHeader("Content-Type", "application/json;charset=UTF-8");
    rest.send(data);
  });
});

app.post("/", function(req, rest) {
  var url = decodeURIComponent(req.query.url);
  urllib.request(url, function(err, data, res) {
    if (err) {
      throw err; // you need to handle error
    }
    rest.setHeader("Access-Control-Allow-Origin", "*");
    rest.setHeader("Content-Type", "application/json;charset=UTF-8");
    rest.send(data);
  });
});

app.listen(4000, function() {
  console.log("Example app listening on port 4000!");
});
